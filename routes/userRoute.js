const express = require("express")
const router = express.Router()
const {registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, updatePhoto, updateCartItemsQuantity , deleteItemFromCart, updateWishList, updateOrderAddress} = require("../controllers/userController")
const {private}  = require("../middlewares/authMiddleware")


// register user
router.post("/registerUser" , registerUser)

// login user
router.post("/loginUser" , loginUser)

// logout user
router.get("/logoutUser" , logoutUser)

// get user
router.get("/getUser", private , getUser)

//get login status
router.get("/getLoginStatus" , getLoginStatus)

// Update User
router.put("/updateUser" , private , updateUser)

// save or update address
router.put("/updateOrderAddress" , private , updateOrderAddress)

// updatePhoto
router.put("/updatePhoto" , private , updatePhoto)

// update Cart Items Quantity
router.put("/updateCartItemsQuantity" , private , updateCartItemsQuantity)

// delete a cart item
router.delete("/deleteItemFromCart"  , private  , deleteItemFromCart )

// delete a wishlist item
router.patch("/updateWishList"  , private  , updateWishList )


module.exports = router