const asyncHandler = require("express-async-handler")
// const { default:mongoose} = require("mongoose")
const Product = require("../models/productModel")


// create Product
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, lensOptions, quantity, sold, regularPrice, price, description, images, ratings , frameType } = req.body

    if (!name || !category || !brand || !availability || !price || !description || !images) {
        throw new Error("Please add all the details")
    }
    const product = await Product.create({
        name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, lensOptions, quantity, sold, regularPrice, price, description, images, ratings , frameType
    });

    res.status(200).json(product)
})

// get all products 
const getProducts = asyncHandler( async(req , res)=>{
    const products = await Product.find().sort("-createdAt")
    res.status(200).json(products)
})

// get a product
const getProduct = asyncHandler( async(req , res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    res.status(200).json(product)
})

// delete Product
const deleteProduct = asyncHandler( async( req , res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"Product has been deleted successfully"
    })
})

// update Product
const updateProduct = asyncHandler( async(req , res)=>{
    const { name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, lensOptions, quantity, sold, regularPrice, price, description, images, ratings  , frameType} = req.body
    let product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    product = await Product.findByIdAndUpdate({_id:req.params.id} , {
        name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, lensOptions, quantity, sold, regularPrice, price, description, images, ratings , frameType
    } , { runValidators:true , new:true});
    res.status(200).json(product) 
})

// review a product 
const reviewProduct = asyncHandler( async(req , res)=>{
    const {star , review , reviewDate , reviewImages} = req.body
    const {id} = req.params

    const product = await Product.findById(id)
    if(!product){
        res.status(400)
        throw new Error("Product not found")
    }

    const currentDay = new Date()
     product.ratings.push({
        star,
        review,
        reviewDate: currentDay.getDay() + "/" + (currentDay.getMonth()+1) + "/" +currentDay.getFullYear() + "  " +currentDay.getHours() + ":"  +currentDay.getMinutes() + ":" +currentDay.getSeconds(),
        reviewImages,
        name:req.user.name,
        userId:req.user._id,
    })

    product.save()
    res.status(200).json(product)
})

// Delete review
const deleteReview = asyncHandler( async(req , res)=>{
    const {userId} = req.body
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400)
        throw new Error("Product not found")
    }

    const newRatings = product.ratings.filter((ratings)=>{
        return ratings.userId.toString() !== userId.toString()
    })

    product.ratings = newRatings
    product.save()

    res.status(200).json(product)
})

// update a review


module.exports = {
    createProduct, getProducts , getProduct , deleteProduct , updateProduct , reviewProduct , deleteReview
}