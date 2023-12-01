const express = require("express")
const { adminOnly , private } = require("../middlewares/authMiddleware")
const { getAllOrders, changeOrderStatus } = require("../controllers/orderController")
const router = express.Router()

//get orders
router.get("/" , private , adminOnly , getAllOrders)

// change status
router.put("/" , private , adminOnly , changeOrderStatus)






module.exports = router