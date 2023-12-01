import axios from "axios";
import { toast } from "react-toastify";

const backend_url = "http://localhost:5000/eyewings/api/v1_1/product"

// create product

const createProduct = async(productData)=>{
    const response = await axios.post(backend_url + "/" , productData)
    return response.data
}

// get all products
const getAllProducts = async(productData)=>{
    const response = await axios.get(backend_url + "/" );
    return response.data
}

// delete product
const deleteProduct = async(productId)=>{
    const response = await axios.delete(backend_url + `/${productId}`)
    return response.data
}

// update product
const updateProduct = async ( data)=>{
 try {
    const response = await axios.patch(backend_url + `/${data.id}` , data.productData)
    return response.data
 } catch (error) {
    return toast.error(error)
 }
}
// get a product 
const getAproduct = async(userData)=>{
    const response = await axios.get(backend_url + `/${userData}`  )
    return response.data
}

// review a product 
const reviewAproduct = async(reviewData)=>{
    const response = await axios.patch(backend_url + `/review/${reviewData.id}` , reviewData.data)
    return response.data
}

// delete a review
const deleteReview = async(userData)=>{
    const response = await axios.patch(backend_url + `/deleteReview/${userData.productId}` , userData.id)
    return response.data
}

// dashboard all orders
const allOrders = async()=>{
    const response = await axios.get("http://localhost:5000/eyewings/dashboard/api/v1/")
    return response.data
}

// update the order status from userOrder and dashboardOrder
const updateOrderStatus = async(userData)=>{
    const response = await axios.put("http://localhost:5000/eyewings/dashboard/api/v1/" , userData)
    return response.data
}

const productService = {
    createProduct , getAllProducts , deleteProduct , updateProduct , getAproduct , reviewAproduct , deleteReview , allOrders , updateOrderStatus
}

export default productService