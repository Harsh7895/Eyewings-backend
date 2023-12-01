const asyncHandler = require("express-async-handler")
const Razorpay = require("razorpay")
var crypto = require("crypto")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const Payment = require("../models/paymentModel")
const Order = require("../models/orderModel")



var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

const checkout = asyncHandler(async (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
    }
    const order = await instance.orders.create(options)
    res.status(200).json(order)
})


const paymentVerification = asyncHandler(async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const userId = req.query.userId;
    const productId = req.query.productId;
    const amount = req.query.amount;

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    const isAuthenticate = expectedSignature === razorpay_signature
    if (isAuthenticate) {
        const user = await User.findById(userId).select("-password")
        const product = await Product.findById(productId)
        const address = user.orderAddress

        if(user && product){
            const payment = await Payment.create({
                userId:userId,
                productId:productId,
                amount:amount,
                razorpay_order_id:razorpay_order_id,
                razorpay_payment_id:razorpay_payment_id
            })

            product.sold = product.sold + 1

            user.orders.push({
                product , address , orderStatus:"order confirmed"
            })

            
            const order = await Order.create({
                user:user,
                product:product,
                amount:amount,
                address:address,
                orderStatus:"order confirmed"
            })
            
            await product.save()
            await user.save()
            await payment.save()
            await order.save()  
            res.redirect(`http://localhost:3000/checkout/complete/${productId}`)
        }
    }
    else {
     res.redirect(`http://localhost:3000/checkout/failed/${productId}`)
    }

})


module.exports = { checkout, paymentVerification }