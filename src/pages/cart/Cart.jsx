// import React, { useEffect } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { TbTruckDelivery } from 'react-icons/tb'
import { AiOutlineShoppingCart, AiOutlineThunderbolt } from 'react-icons/ai'
import { BsCartX } from 'react-icons/bs'
import { deleteItemFromCart, updateCartItemsQuantity } from '../../reducer/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const description = (product) => {
    const words = product.description.split(' ');
    const first10words = words.slice(0, 19);
    let result = `${first10words.join(' ')}...`
    return result
  }

  const updateCartItems = async (e, index) => {
    const updatedItem = {
      quantity: e.target.value, index: index
    }
    await dispatch(updateCartItemsQuantity(updatedItem))
    totalPrice()
  }

  const deleteCartItem = async (index) => {
    const del = {
      index: index
    }
    await dispatch(deleteItemFromCart(del))
    totalPrice()
  }

  const totalPrice = () => {
    let price = 0
    user?.user?.cartItems.map((item) => {
      price = (item.price * item.quantity) + price
    })
    return price
  }


  return (
    <div className='cart'>

      <div className="cartItems">
        <h1 className='heading'>Shopping Cart</h1>
        {
          user && user.user.cartItems.length === 0 && <div className='empty-cart'>
            <h1> <AiOutlineShoppingCart /> Cart is Empty</h1>
          </div>
        }
        {!user && <div className='noUser'>
          <h1>Login First...</h1>
          <div> <button onClick={() => navigate("/login")}>Login</button></div>
        </div>}
        {user && user.user.cartItems.map((product, index) => (
          <div className="item" key={index}>
            <img src={product.images[0]} alt={product.name} />
            <div className="info">
              <h1 onClick={() => navigate(`/product/${product?._id}`)}>{product.name}</h1>
              <h2 onClick={() => navigate(`/product/${product?._id}`)}>{description(product)}</h2>
              {product.availability ? <p style={{ color: "green" }}>In stock</p> : <p style={{ color: "red" }}>Out of Stock</p>}
              <div className='prices'>
                {product.regularPrice && <h3>  ₹{product.regularPrice}</h3>}
                <h1>  ₹{product.price}</h1>
              </div>
              <div className="delivery">
                <TbTruckDelivery /> Free Delivery!
              </div>
            </div>
            <div className="btns">
              <div className="quantity">
                <label >Qty</label>
                <select name="qty" value={product.quantity} onChange={(e) => {
                  updateCartItems(e, index)
                }} >

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <button className='remove'
                onClick={() => deleteCartItem(index)}
              >Remove from Cart <BsCartX /> </button>
              <button className='buy' onClick={() => navigate(`/product/checkout/${product._id}`)}>Buy this Now <AiOutlineThunderbolt /> </button>

            </div>

            <div className="product-details">
              <h3>Product Details</h3>
              <p>Price : ₹{(product.price) * product.quantity}</p>
              {product.regularPrice && <p>Discount : ₹{(product.regularPrice - product.price) * product.quantity}</p>}
              {!product.regularPrice && <p>Discount : ₹{(product.price) * product.quantity}</p>}
              <p>Prescription Required: {product.prescriptionRequired ? product.prescriptionRequired : `False`}</p>
              {
                product.quantity > 1 ?
                  <h5>Amount Payable({product.quantity} Items) :- {product.price * product.quantity}</h5> :
                  <h5>Amount Payable :- {product.price * product.quantity}</h5>
              }
            </div>
          </div>
        ))}

        <hr style={{ marginTop: "100px" }} />
        <div className="cart-bottom-main" style={{ display: 'flex', justifyContent: "space-between", width: "80%", alignItems: "center", margin: '0 auto', borderBottom: "1px solid grey", }}>
          <h3 style={{ margin: 0, padding: "0", borderBottom: "1px solid black", paddingBottom: "5px" }}>Total (<span>{user?.user?.cartItems && user.user.cartItems?.length} Products</span>)</h3>
          <h1 style={{ display: "flex", alignItems: "center", }}>
            ₹{totalPrice()} <button
              style={{
                padding: "10px 20px", marginLeft: "20px", fontSize: "16px", outline: "none", cursor: "pointer", border: "none",
                fontWeight: "600", color: "white", backgroundColor: "orangered"
              }}
            >Shop Now > > ></button>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Cart