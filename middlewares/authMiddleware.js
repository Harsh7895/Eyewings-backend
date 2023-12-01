const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const private = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(400)
            throw new Error("Not authorized")
        }
        // verified token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        // verify user
        const userId = Buffer.from(verified.id.data).toString("hex")
        const user = await User.findById(userId)
        if (!user) {
            res.status(400)
            throw new Error("User not found")
        }
        req.user = user
        next()

    } catch (error) {
        res.status(400)
        throw new Error("Not Authrorized , Please login")
    }
})

const adminOnly = asyncHandler( async(req , res , next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        res.status(400)
        throw new Error("Not authorized as admin")
    }
})

module.exports = { private  , adminOnly}