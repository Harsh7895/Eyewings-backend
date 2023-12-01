const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct, reviewProduct, deleteReview } = require("../controllers/productController");
const {private, adminOnly} = require("../middlewares/authMiddleware")

const router = express.Router();

// create product
router.post("/" ,private, adminOnly, createProduct);

// get all products
router.get("/" , getProducts)

// get a product 
router.get("/:id" , getProduct)

// delete a product 
router.delete("/:id" , private , adminOnly , deleteProduct)

// update product
router.patch("/:id" , private , adminOnly , updateProduct)

// review product
router.patch("/review/:id" , private , reviewProduct)

// delete review
router.patch("/deleteReview/:id" , private , deleteReview)

// update a review

module.exports = router