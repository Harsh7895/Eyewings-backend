const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const paymentRoute = require("./routes/paymentRoute")
const orderRoute = require("./routes/orderRoute")
const errorMiddleware = require("./middlewares/errorMiddleware")
const { private } = require("./middlewares/authMiddleware")

const app = express()



// Middleware
app.use(cors({
    origin: "https://eyewings-frontend.vercel.app" ,
    methods: 'GET , POST , PUT , PATCH , DELETE , HEAD',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use("/eyewings/Auth/api/v1/user", userRouter)
app.use("/eyewings/api/v1_1/product", productRoute);
app.use("/eyewings/product/api/payment", paymentRoute);
app.use("/eyewings/dashboard/api/v1" , orderRoute)



app.get("/", (req, res) => {
    res.send("Home Page...")
})


// error Middleware
app.use(errorMiddleware)
app.use(private)



mongoose.connect(process.env.MONGO_URI, { dbName: "Eyewings" }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
}).catch((err) => console.log(err))

module.exports = app
