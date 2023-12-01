const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please add the name"],
        trim:true,
    },
    sku:{
        type:String,
        required:true,
        default:"SKU",
        trim:true
    },
    frameType:{
        type:String,
        required:true,
        default:"Eyeglasses",
        trim:true
    },
    gender:{
        type:String,
        default:"Unisex",
        trim:true
    },
    category:{
        type:String,
        required:[true , "Please add the category"],
        trim:true
    },
    brand:{
        type:String,
        required:[true , "Please add a brand"],
        trim:true,
    },
    model:{
        type:String,
        default:"",
        trim:true
    },
    availability:{
        type:Boolean,
        required:true,
        default:false,
        trim:true
    },
    color:{
        type:String,
        required:[true , "Please add a color"],
        default:"As seen",
        trim:true
    },
    frameMaterial:{
        type:String,
        required:true,
        default:"Metal",
        trim:true
    },
    lensMaterial:{
        type:String,
        default:"Normal",
        trim:true,
    },
    lensColor:{
        type:String,
        required:true,
        default:"As Seen",
        trim:true
    },
    prescriptionRequired:{
        type:Boolean,
        default:false,
        trim:true,
    },
    lensOptions:{
        type:[Object]
    },
    quantity:{
        type:Number,
        required:[true , "Please add the quantity"],
        default:1,
        trim:true,
    },
    sold:{
        type:Number,
        default:0,
        trim:true,
    },
    regularPrice:{
        type:Number,
        trim:true,
    },
    price:{
        type:Number,
        required:[true , "Please add the price"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please add the description"],
        trim:true,
    },
    images:{
        type:[String]
    },
    ratings:{
        type:[Object]
    }


} , {timestamps:true})

const Product = mongoose.model("Product" , productSchema);
module.exports = Product;