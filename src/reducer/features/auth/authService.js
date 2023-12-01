import axios from 'axios'

const backend_url = "http://localhost:5000/eyewings/Auth/api/v1/user/"

// register user
const register = async (userData) => {
    const response = await axios.post(backend_url + "registerUser", userData);
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(backend_url + "loginUser", userData);
    return response.data
}

// logout user
const logout = async (userData) => {
    const response = await axios.get(backend_url + "logoutUser");
    return response.data
}

// get loginLoginStatus
const loginStatus = async (userData) => {
    const response = await axios.get(backend_url + "getLoginStatus");
    return response.data
}

// get user
const getUser = async (userData) => {
    const response = await axios.get(backend_url + "getUser")
    return response.data
}

//  update user 
const updateUser = async (userData) => {
    const response = await axios.put(backend_url + "updateUser", userData)
    return response.data
}

// update Photo 
const updatePhoto = async (userData) => {
    const response = await axios.put(backend_url + "updatePhoto", userData)
    return response.data
}

// update CArt items quantity
const updateCartItemsQuantity = async (userData) => {
    const response = await axios.put(backend_url + "updateCartItemsQuantity", userData)
    return response.data
}

// delete cart items 
const deleteItemFromCart = async (userData) => {
    const response = await axios.delete(backend_url + "deleteItemFromCart", userData)
    return response.data
}
// delete wishlist items 
const updateWishList = async (userData) => {
    const response = await axios.patch(backend_url + "updateWishList", userData)
    return response.data
}

// update and save orderAddress
const updateOrderAddress = async(userData)=>{
    const response = await axios.put(backend_url + "/updateOrderAddress" , userData)
    return response.data
}


const productCheckout = async(userData)=>{
    const response = await axios.post( "http://localhost:5000/eyewings/product/api/payment/checkout" , userData)
    return response.data
}

const authService = {
    register, logout, login, loginStatus, getUser, updateUser, updatePhoto, updateCartItemsQuantity, deleteItemFromCart , updateWishList , productCheckout , updateOrderAddress
}

export default authService;