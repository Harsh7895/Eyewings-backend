const express = require("express")
const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const User = require("../models/userModel")

const getAllOrders = asyncHandler( async(req , res)=>{
    const orders = await Order.find().sort("createdAt")
    res.status(200).json(orders)
})

const changeOrderStatus = asyncHandler(async (req, res) => {
    try {
        const userId = req.body.userId;
        const orderId = req.body.orderId;
        const productId = req.body.productId;
        const orderStatus = req.body.orderStatus;

        const order = await Order.findById(orderId);
        const user = await User.findById(userId).select("-password");

        if (order && user && productId) {
            order.orderStatus = orderStatus;
            
            user.orders.forEach((product, index) => {
                if (product.product._id.toString() === productId) {
                    user.orders[index].orderStatus = orderStatus;
                }
            });

            await order.save();
            user.markModified('orders');
            await user.save();
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = {getAllOrders , changeOrderStatus }