import React, { useEffect } from 'react'
import './userOrder.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FaFileInvoice } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { BiSolidHelpCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../reducer/features/auth/authSlice'
import img from './scooter.png'

const UserOrders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])


    return (
       <div style={{width:"100vw" , backgroundColor:"whitesmoke"}}>
         <div className='user-orders'>
            <h1>Your orders</h1>
            <hr />

            {user?.user?.orders?.length <= 0 && <div className="no-items">
                <h2>No Orders Yet.</h2>
                <button onClick={() => navigate("/product/listing/all")}>Shop Now</button>
            </div>
            }
            {user?.user?.orders?.length !== 0 && <div className="orderAddress">
                <section className="one">
                    <h4>Delivery Address</h4>
                    <h5>{user?.user?.orderAddress?.name}</h5>
                    <p>{user?.user?.orderAddress?.street} , {user?.user?.orderAddress?.city}-{user?.user?.orderAddress?.pincode} , {user?.user?.orderAddress?.state}</p>
                    <h5>Phone Number {user?.user?.orderAddress?.phone}</h5>
                </section>
                <section className="two">
                    <h4>More actions</h4>
                    <p><span><FaFileInvoice/> Download Invoice</span>   <button>Download</button></p>
                </section>
            </div>}

            <div className="order-products">
                {
                    user?.user?.orders?.length !== 0 && user?.user?.orders.map((product , index)=>(
                        <div className='order-product' key={index}>
                            <img src={product.product.images[0]} alt="" onClick={()=> navigate(`/product/${product.product._id}`)}/>

                            <div className="detail">
                                <h4 onClick={()=> navigate(`/product/${product.product._id}`)}>{product.product.name}</h4>
                                <span>Color : {product.product.color}</span>
                                <span>Shape : {product.product.category}</span>

                                <h3>₹{product.product.price}</h3>
                            </div>

                            <div className="status">
                                <h4>Order Confirmed {product.orderStatus === "order confirmed" && <span><img src={img} alt="" /></span>} </h4>
                                <h4>Shipped {product.orderStatus === "shipped" && <span><img src={img} alt="" /></span>}</h4>
                                <h4>Out for Delivery {product.orderStatus === "out for delivery" && <span><img src={img} alt="" /></span>}</h4>
                                <h4>   Delivered  {product.orderStatus === "delivered" && <span><img src={img} alt="" /></span>}</h4>
                            </div>

                            <div className="rate-review">
                                <p onClick={()=> navigate(`/product/${product.product._id}?review=rate&review`)}  style={{marginTop:"50px"}}><AiFillStar/> Rate & Review Product</p>
                                <p><BiSolidHelpCircle/> Help</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
       </div>
    )
}

export default UserOrders