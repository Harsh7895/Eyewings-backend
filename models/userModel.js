const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please add a name"]
    },
    email:{
        type:String,
        required:[true , "Please add a email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true , "Please add a password"],
        minLength:[6, "Password should be more than 6 letter"]
    },
    role:{
        type:String,
        required:[true],
        default:"customer",
        enum:["customer" , "admin"]
    }, 
    gender:{
        type:String,
    },
    photo:{
        type:String,
        required:[true, "Please add a photo"],
        default:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone:{
        type:String,
        default:"+91"
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    cartItems:{
        type:[Object],
        trim:true
    },
    wishListItems:{
        type:[Object],
        trim:true
    },
    orderAddress:{
        name:String,
        phone:Number,
        alternatePhone:Number,
        locality:String,
        street: String,
        city: String,
        state: String,
        landmark:String,
        pincode: String,
    },
    orders:{
        type:[Object],
        trim:true
    }
})

// encrypt password before saving to db
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next()
    }
    // hash password
    const hashedPassword = await bcrypt.hash(this.password , 10);
    this.password = hashedPassword
    next()
})

const User = mongoose.model( "User" , userSchema)
module.exports = User