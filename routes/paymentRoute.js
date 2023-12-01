const express = require("express")
const { checkout, paymentVerification } = require("../controllers/paymentController")
const {private} = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/checkout" , private , checkout)

router.post("/paymentVerification" , private , paymentVerification)

router.get("/getkey" , async(req , res)=>{
    res.status(200).json({key:process.env.RAZORPAY_ID})
})
module.exports = router