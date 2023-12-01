import React, { useEffect, useState } from 'react'
import './buypage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { PiNumberSquareOneFill, PiNumberSquareThreeFill, PiNumberSquareTwoFill } from 'react-icons/pi'
import { BsCheck } from 'react-icons/bs'
import { AiFillBell, AiFillStar } from 'react-icons/ai'
import { FaTruck } from 'react-icons/fa'
import { logout, updateOrderAddress } from '../../reducer/features/auth/authSlice'
import { getAproduct } from '../../reducer/features/product/productSlice'
import axios from 'axios'



const BuyPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const { product } = useSelector((state) => state.product)
    const { id } = useParams()

    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
      if (user?.user?.cartItems?.length > 0) {
        const filteredItems = user?.user.cartItems.filter((item) => item?._id === product?._id);
        setCartItem(filteredItems);
      }
    }, [user, product]);
    
    useEffect(() => {
        dispatch(getAproduct(id));
    }, [dispatch, id ]);

    const initialValue = {
        name: user?.user?.orderAddress?.name || "",
        phone: user?.user?.orderAddress?.phone || null,
        alternatePhone: user?.user?.orderAddress?.alternatePhone || null,
        pincode: user?.user?.orderAddress?.pincode || "",
        locality: user?.user?.orderAddress?.locality || "",
        street: user?.user?.orderAddress?.street || "",
        city: user?.user?.orderAddress?.city || "",
        state: user?.user?.orderAddress?.state || "",
        landmark: user?.user?.orderAddress?.landmark || "",
    }


    const [deliveryAddress, setdeliveryAddress] = useState(initialValue)
    const [isShowLoginChange, setIsShowLoginChange] = useState(false)
    const [isShowDeliveryForm, setIsShowDeliveryForm] = useState(true)
    const [isShowOrderSummary, setIsShowOrderSummary] = useState(false)
    const initialProductQuantity = cartItem?.length > 0 ? Number(cartItem[0]?.quantity) : 1;
    const [productquantity, setProductQuantity] = useState(initialProductQuantity);

    const { name, phone, alternatePhone, pincode, locality, street, city, state, landmark } = deliveryAddress

    const handledeliveryform = (e) => {
        const { name, value } = e.target
        setdeliveryAddress({ ...deliveryAddress, [name]: value })
    }

    const handleDelivery = async (e) => {
        e.preventDefault()
        const userData = {
            name, phone, alternatePhone, pincode, locality, street, city, state, landmark
        }
        await dispatch(updateOrderAddress(userData))
        setIsShowDeliveryForm(false)
        setIsShowOrderSummary(true)
    }

    const minusQuantity = () => {
        if (productquantity > 1) {
            setProductQuantity(productquantity - 1)
        }
    }
    const plusQuantity = () => {
        setProductQuantity(productquantity + 1)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }
    const handleShowLoginPage = () => {
        setIsShowLoginChange(false)
        setIsShowDeliveryForm(true)
        setIsShowOrderSummary(false)
    }

    const handleCheckout = async () => {
        setIsShowOrderSummary(false)
        const userData = {
            amount: product?.price * productquantity,
        }
        const { data } = await axios.post("http://localhost:5000/eyewings/product/api/payment/checkout", userData)
        const { data: { key } } = await axios.get("http://localhost:5000/eyewings/product/api/payment/getkey")
        console.log(data, key)
        var options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: data?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Harsh Pawar", //your business name
            description: "Test Transaction",
            image: user?.user?.photo,
            order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:5000/eyewings/product/api/payment/paymentVerification?userId=" + user.user._id + "&productId=" + product._id + "&amount=" + data.amount,
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": `${name}`, //your customer's name
                "email": `${user.email?user.email:""}`,
                "contact": `${phone?phone:""}`  //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                "address": "Razorpay Corporate Office",
            },
            theme: {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
    }

    return (
        <div className='page'>
            <section className="left-side">
                <div className='isLogin'>
                    {
                        !isShowLoginChange && <div>
                            <p> <PiNumberSquareOneFill /> <span> <span>Log In  {user && <BsCheck />} </span>{user?.user?.email}</span></p>
                            {user && <button onClick={() => setIsShowLoginChange(true)}>Change</button>}
                        </div>
                    }
                    {
                        isShowLoginChange && <div className="details">
                            <p> <PiNumberSquareOneFill /> LOGIN </p>
                            <section>
                                <div className="one">
                                    <p>
                                        Email : <span>{user?.user?.email}</span>
                                    </p>
                                    <span onClick={handleLogout}>Logout and Sign in to another account </span>
                                    <button onClick={handleShowLoginPage}>CONTINUE CHECKOUT</button>
                                </div>
                                <div className="two">
                                    <p className='main'>Advantages of our secure login</p>
                                    <p><FaTruck /> Easily Track Orders</p>
                                    <p><AiFillBell /> Get Relevant Recommendations</p>
                                    <p><AiFillStar /> Wishlist , Ratings , Reviews and more.</p>
                                </div>
                            </section>
                            <p className="btm">
                                Please note that upon clicking "Logout" you will loose all item in cart and will be redirect to Our home page.
                            </p>
                        </div>
                    }
                </div>
                <div className='deliverAddress'>
                    {!isShowDeliveryForm && <div>
                        <p> <PiNumberSquareTwoFill /> <span> <span>DELIVERY ADDRESS  {user && <BsCheck />} </span></span></p>
                        {user && <button onClick={() => setIsShowDeliveryForm(true)}>Change</button>}
                    </div>}
                    {isShowDeliveryForm && <div className='deliveryAddress-form'>
                        <p> <PiNumberSquareTwoFill /> DELIVERY ADDRESS </p>
                        <form onSubmit={handleDelivery}>
                            <p>
                                <label>Name</label>
                                <input type="text" required name='name' value={name} onChange={handledeliveryform} />
                            </p>
                            <p>
                                <label>10-digit Mobile Number</label>
                                <input type="telephone" required name='phone' value={phone} onChange={handledeliveryform} />
                            </p>
                            <p>
                                <label>Pincode</label>
                                <input type="text" required name='pincode' value={pincode} onChange={handledeliveryform} />
                            </p>
                            <p>
                                <label>Locality</label>
                                <input type="text" required name='locality' value={locality} onChange={handledeliveryform} />
                            </p>
                            <p >
                                <label>Address (area and street) </label>
                                <textarea type="text" id='streetAdd' name='street' required value={street} onChange={handledeliveryform} />
                            </p>
                            <p></p>
                            <p>
                                <label>City/District/Town</label>
                                <input type="text" required name='city' value={city} onChange={handledeliveryform} />
                            </p>
                            <p>
                                <label>State</label>
                                <select id="country-state" name="state" value={state} onChange={handledeliveryform} required >
                                    <option value="">Select state</option>
                                    <option value="AN">Andaman and Nicobar Islands</option>
                                    <option value="AP">Andhra Pradesh</option>
                                    <option value="AR">Arunachal Pradesh</option>
                                    <option value="AS">Assam</option>
                                    <option value="BR">Bihar</option>
                                    <option value="CH">Chandigarh</option>
                                    <option value="CT">Chhattisgarh</option>
                                    <option value="DN">Dadra and Nagar Haveli</option>
                                    <option value="DD">Daman and Diu</option>
                                    <option value="DL">Delhi</option>
                                    <option value="GA">Goa</option>
                                    <option value="GJ">Gujarat</option>
                                    <option value="HR">Haryana</option>
                                    <option value="HP">Himachal Pradesh</option>
                                    <option value="JK">Jammu and Kashmir</option>
                                    <option value="JH">Jharkhand</option>
                                    <option value="KA">Karnataka</option>
                                    <option value="KL">Kerala</option>
                                    <option value="LA">Ladakh</option>
                                    <option value="LD">Lakshadweep</option>
                                    <option value="MP">Madhya Pradesh</option>
                                    <option value="MH">Maharashtra</option>
                                    <option value="MN">Manipur</option>
                                    <option value="ML">Meghalaya</option>
                                    <option value="MZ">Mizoram</option>
                                    <option value="NL">Nagaland</option>
                                    <option value="OR">Odisha</option>
                                    <option value="PY">Puducherry</option>
                                    <option value="PB">Punjab</option>
                                    <option value="RJ">Rajasthan</option>
                                    <option value="SK">Sikkim</option>
                                    <option value="TN">Tamil Nadu</option>
                                    <option value="TG">Telangana</option>
                                    <option value="TR">Tripura</option>
                                    <option value="UP">Uttar Pradesh</option>
                                    <option value="UT">Uttarakhand</option>
                                    <option value="WB">West Bengal</option>
                                </select>
                            </p>
                            <p>
                                <label>Landmark (optional)</label>
                                <input type="text" name='landmark' value={landmark} onChange={handledeliveryform} />
                            </p>
                            <p>
                                <label>Alternate Phone (optional)</label>
                                <input type="telephone" name='alternatePhone' value={alternatePhone} onChange={handledeliveryform} />
                            </p>
                            <p id='check'>
                                <h4>Address Type</h4>
                                <section>
                                    <div>
                                        <input type="checkbox" id="scales" name="home" />
                                        <label htmlFor="scales">Home (all day delivery)</label>
                                    </div>

                                    <div>
                                        <input type="checkbox" id="horns" name="office" />
                                        <label htmlFor="horns">Office (delivery between 9 to 5)</label>
                                    </div>
                                </section>
                            </p>
                            <p></p>
                            <button>SAVE AND DELIVER HERE</button>
                            <button id='cancel'>CANCEL</button>
                        </form>
                    </div>}
                </div>
                <div className='productDetail'>
                    {!isShowOrderSummary && <div>
                        <p> <PiNumberSquareThreeFill /> <span> <span>ORDER SUMMARY  </span></span></p>
                    </div>
                    }
                    {isShowOrderSummary && <div className='order-summary'>
                        <p> <PiNumberSquareThreeFill /> ORDER SUMMARY </p>
                        <div className="product">
                            <div className="image">
                                <img src={product.images[0]} alt={product.name} />
                                <p>
                                    <span className='minus' onClick={minusQuantity}>-</span>
                                    <span className='value'>{productquantity}</span>
                                    <span className='plus' onClick={plusQuantity}>+</span>
                                </p>
                            </div>
                            <div className="detail">
                                <p>{product.name}</p>
                                <span>Model : {product?.model}</span>
                                <span>Color : {product?.color}</span>
                                <p> <span>₹{product?.regularPrice * productquantity}</span>  ₹{product?.price * productquantity}</p>
                                <p className='cancel'> <button onClick={handleCheckout}>Pay</button> <span onClick={() => navigate("/cart")}>Cancel</span></p>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
            <section className="right-side">
                <div>
                    <h3>Product Details</h3>
                    <h4>Price : {product?.price * productquantity} </h4>
                    <h4>Delivery : {0} </h4>

                    <h3 className='right-total' >Total Price : {product?.price * productquantity}</h3>
                </div>
            </section>
        </div>
    )
}

export default BuyPage