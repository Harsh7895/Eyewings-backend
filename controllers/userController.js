const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

const generateToken = ({ id }) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "7d"
    })
}

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all the details")
    }
    if (password.length < 6) {
        res.status(401)
        throw new Error("Password must be more than 6 characters")
    }

    // check if the user exist 
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        res.status(400)
        throw new Error("User already exist")
    }

    // create user 
    const user = await User.create({
        name, email, password
    })

    const token = generateToken(user._id)
    if (user) {
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
        })
    } else {
        res.status(400)
        throw new Error("invalid user Data")
    }

    // send data 
    res.status(200).json({
        success: true,
        user,
        token,
        message: "user created successfully"
    })


})

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill the password and email")
    }
    let user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("User Not Found")
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        res.status(400)
        throw new Error(" Invalid Password or email")
    }

    const token = generateToken(user._id);
    user = await User.findOne({ email }).select("-password")
    if (user && checkPassword) {
        res.cookie("token", token, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
        })

        res.status(200).json({
            message: "Logged in succesfully",
            user,
            token
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        path: "/",
        expires: new Date(0)
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

// Get user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password")
    if (user) {
        res.status(200)
        res.json({
            success: true,
            user
        })
    } else {
        res.status(400)
        throw new Error("User not found")
    }
});

// Get login status
const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json(false)
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    if (!verified) {
        return res.json(true)
    } else {
        return res.json(true)
    }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user.id).select("-password");
    if (user) {
        const { name, phone, address, state, cartItems, wishListItems } = user
        user.name = req.body.name || name
        user.phone = req.body.phone || phone
        user.address = req.body.address || address
        user.state = req.body.state || state
        const cartItem = req.body.cartItem || null
        if (cartItems.length === 0 && cartItem !== null) {
            user.cartItems = cartItem
        }
        if (cartItem !== null && cartItems.length > 0) {
            user.cartItems.push(cartItem)
        }
        const wishListItem = req.body.wishListItem || null
        if (wishListItems.length === 0 && wishListItem !== null) {
            user.wishListItems = wishListItem
        }
        if (wishListItem !== null && wishListItems.length > 0) {
            user.wishListItems.push(wishListItem)
        }


        user = await user.save()

        res.status(200).json({
            success: true,
            user
        })
    } else {
        res.status(400).json({
            success: false,
            message: "User Not found"
        })
    }
});

// save and update orderAddress
const updateOrderAddress = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user.id).select("-password");
    if (user) {
        const { orderAddress } = user
        orderAddress.name = req.body.name || orderAddress.name,
            orderAddress.phone = req.body.phone || orderAddress.phone,
            orderAddress.alternatePhone = req.body.alternatePhone || orderAddress.alternatePhone,
            orderAddress.city = req.body.city || orderAddress.city,
            orderAddress.landmark = req.body.landmark || orderAddress.landmark,
            orderAddress.locality = req.body.locality || orderAddress.locality,
            orderAddress.pincode = req.body.pincode || orderAddress.pincode,
            orderAddress.street = req.body.street || orderAddress.state,
            orderAddress.state = req.body.state ||  orderAddress.state

        user.orderAddress = orderAddress

        user = await user.save()

        res.status(200).json({
            success: true,
            user
        })
    } else {
        res.status(400).json({
            success: false,
            message: "User Not found"
        })
    }
})

// Update photo
const updatePhoto = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        const { photo } = user;
        const newPhoto = req.body.photo;


        // You may want to perform additional validation on 'newPhoto' here.

        user.photo = newPhoto || photo;
        user = await user.save();
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Server error"
        });
    }
});

// update cart items
const updateCartItemsQuantity = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        const i = req.body.index
        const cartItem = user.cartItems[i]
        cartItem.quantity = req.body.quantity

        user.cartItems[i] = cartItem;

        user = await user.save()
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Server error"
        });
    }
})

// delete a item from a cart
const deleteItemFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        const index = req.body.index;
        if (index < 0 || index >= user.cartItems.length) {
            return res.status(400).json({
                success: false,
                error: "Invalid index provided",
            });
        }

        // Remove the item at the specified index
        user.cartItems.splice(index, 1);

        // Save the user with the updated cart

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
};

// delete a item form wishlist 
const updateWishList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        const id = req.body.id

        for (let i = 0; i < user.wishListItems?.length; i++) {
            if (user.wishListItems[i]._id === id) {
                user.wishListItems.splice(i, 1)
            }
        }

        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
})

module.exports = { registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, updatePhoto, updateCartItemsQuantity, deleteItemFromCart, updateWishList, updateOrderAddress }