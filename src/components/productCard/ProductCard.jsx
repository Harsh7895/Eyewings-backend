import React, { useEffect, useState } from 'react'
import './productCard.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiShare } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import { BsCartCheck, BsCartCheckFill } from 'react-icons/bs'
import { MdOutlineModeEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, updateProduct } from '../../reducer/features/product/productSlice'
import {  updateUser, updateWishList } from '../../reducer/features/auth/authSlice'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




const Form = ({ product, showForm, setShowForm }) => {

  const initialState = {
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    brand: product?.brand || "",
    model: product?.model || "",
    availability: product?.availability || true,
    color: product?.color || "",
    frameMaterial: product?.frameMaterial || "",
    lensMaterial: product?.lensMaterial || "",
    lensColor: product?.lensColor || "",
    prescriptionRequired: product?.prescriptionRequired || false,
    quantity: product?.quantity || null,
    regularPrice: product?.regularPrice || null,
    price: product?.price || null,
    description: product?.description || "",
    frameType:product?.frameType || ""
  }

  const [formData, setFormData] = useState(initialState)

  const { name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, quantity, regularPrice, price, description, frameType } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const dispatch = useDispatch()
  const editForm = async (e) => {
    e.preventDefault()
    const productData = {
      name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, quantity, regularPrice, price, description , frameType
    }
    const data = {
      id: product._id, productData
    }
    await dispatch(updateProduct(data))
    setShowForm(!showForm)
  }

  return (
    <div className='edit-form'>
      <h1>Product Edit Form</h1>
      <ImCross className='cross' onClick={() => setShowForm(!showForm)} />
      <form onSubmit={editForm} >
        <div className="input-fields">
          <p>
            <label>Name</label>
            <input type="text" name='name' value={name} onChange={handleInputChange} />
          </p>
          <p>
            <label>SKU</label>
            <input type="text" name='sku' value={sku} onChange={handleInputChange} />
          </p>
          <p>
            <label>Frame Type</label>
            <input type="text" name='frameType' value={frameType} onChange={handleInputChange} />
          </p>
          <p>
            <label>Category</label>
            <input type="text" name='category' value={category} onChange={handleInputChange} />
          </p>
          <p>
            <label>Brand</label>
            <input type="text" name='brand' value={brand} onChange={handleInputChange} />
          </p>
          <p>
            <label>Model</label>
            <input type="text" name='model' value={model} onChange={handleInputChange} />
          </p>
          <p>
            <label>Availaibilty</label>
            <select name="availability" value={availability} onChange={handleInputChange} >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </p>
          <p>
            <label>Prescription Required</label>
            <select name="prescriptionRequired" value={prescriptionRequired} onChange={handleInputChange} >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </p>
          <p>
            <label >Color</label>
            <input type="text" name='color' value={color} onChange={handleInputChange} />
          </p>
          <p>
            <label>FrameMaterial</label>
            <input type="text" name='frameMaterial' value={frameMaterial} onChange={handleInputChange} />
          </p>
          <p>
            <label >LensMaterial</label>
            <input type="text" name='lensMaterial' value={lensMaterial} onChange={handleInputChange} />
          </p>
          <p>
            <label >LensColor</label>
            <input type="text" name='lensColor' value={lensColor} onChange={handleInputChange} />
          </p>
          <p>
            <label htmlFor="">Quantity</label>
            <input type="number" name='quantity' value={quantity} onChange={handleInputChange} />
          </p>
          <p>
            <label >RegularPrice</label>
            <input type="number" name='regularPrice' value={regularPrice} onChange={handleInputChange} />
          </p>
          <p>
            <label >Price</label>
            <input type="number" name='price' value={price} onChange={handleInputChange} />
          </p>
          <p>
            <label >Description</label>
            <textarea name="description" value={description} onChange={handleInputChange} id="" cols="30" rows="10"></textarea>
          </p>
        </div>

        <button className='btn' >Submit</button>

      </form>
    </div>
  )
}



const ProductCard = ({ product }) => {


  const [showEditOptions, setShowEditOptions] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [wishlist, setWishlist] = useState(false)
  const [addToCart, setAddToCart] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleToggleOptions = () => {
    setShowEditOptions(!showEditOptions)
  }
  const handleEditFormOptions = () => {
    setShowForm(!showForm)
  }

  const handleDelete = async () => {
    var userClickedOK = window.confirm("Do you want to delete this product?");
    if (userClickedOK) {
      await dispatch(deleteProduct(product._id))
    }
    else {
      return
    }
  }

  const r = product.regularPrice
  const p = product.price
  let off = -Math.floor((p * 100) / r) + 100

  const words = product.description.split(' ');
  const first10words = words.slice(0, 13);
  let result;
  result = `${first10words.join(' ')}...`

  const { user } = useSelector((state) => state.auth)


  useEffect(()=>{
    const cartitem = user?.user?.cartItems?.length;
    for(let i =0; i< cartitem ; i++){
      if(user?.user.cartItems[i]._id === product._id){
        setAddToCart(true)
      }else{
        setAddToCart(false)
      }
    }
  },[user , product])

  
  const handleCartItems = async () => {
    if (!user) {
      navigate("/login")
    return toast.error("Login First")
  }
  
  const copiedProduct = {...product}
  copiedProduct.quantity = 1;
  
  const userData = {
    cartItem: copiedProduct
  }
  await dispatch(updateUser(userData))
  
  toast.success("item added to cart")
  setAddToCart(true)
}

useEffect(()=>{
  const wishlistItem = user?.user?.wishListItems?.length;
  if(user?.user?.wishListItems?.length === 0){
    setWishlist(false)
  }
  for(let i =0; i< wishlistItem ; i++){
    if(user?.user.wishListItems[i]?._id === product._id){
      setWishlist(true)
    }
  }
},[user , product])

const handleWishlistItem = async() => {
  setWishlist(false)
  if(!user){
    return toast.error("Please Login First")
  }
  const userData = {
    wishListItem: product
  }

  await dispatch(updateUser(userData))
  
}
  
const removeWhislistItem = async() =>{
  setWishlist(false)
  
  const copiedProduct = {...product}
  const id = copiedProduct._id
    const userData = {
     id:id
    }
    console.log("enter")
    await dispatch(updateWishList(userData))
}

const shareURL = `http://localhost:3000/product/${product._id}`;

const handleShareClick = () => {
  if (navigator.share) {
    navigator.share({
      title: "Share this link",
      url: shareURL
    })
    .then(() => console.log("URL shared successfully"))
    .catch((error) => console.error("Error sharing URL:", error));
  } else {
    console.log("Sharing not supported in this browser.");
  }
};

return (
  <div>
    {showForm && <div className="product-card">
      <div className="imgSection">
        <img src={product.images[0]} alt={product.name} className='img1' />
        <img src={product.images[1]} alt={product.name} className='img2' />
        {showEditOptions && <div className="userBtn">
          <button onClick={handleEditFormOptions}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>}
      </div>
      <div className="name" onClick={()=> navigate(`/product/${product?._id}`)}>
        {product.name}
      </div>
      <div className="model">
        Model : {product.model}
      </div>
      <div className="description" onClick={()=> navigate(`/product/${product._id}`)}>
        {result}
      </div>
      <hr />
      <div className="btm">
        <div className="prices">
          {product.regularPrice && <>
            <span className='off' >{off}% off</span>
            <br />
            <span className='regular-price' >₹{product.regularPrice}</span>
          </>}
          <span className='price' >₹{product.price}</span>
        </div>
        {!addToCart && <button onClick={handleCartItems}>Add to <BsCartCheck /> </button>}
        {addToCart && <button onClick={() => navigate("/cart")} >Go to <BsCartCheckFill /> </button>}
      </div>
      <div className="svgs">
        {!wishlist && <AiOutlineHeart onClick={handleWishlistItem} /> }
        {wishlist && <AiFillHeart onClick={removeWhislistItem} />}
        <BiShare style={{ color: "black" }} onClick={handleShareClick}/>
        {user && user?.user.role === "admin" && <MdOutlineModeEdit onClick={handleToggleOptions} style={{ color: "black" }} />}
      </div>
    </div>}
    {!showForm && <Form product={product} showForm={showForm} setShowForm={setShowForm} />}
  </div>
)

}

export default ProductCard