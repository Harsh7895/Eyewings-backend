import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./list.scss"

const List = () => {

  const { user } = useSelector((state) => state.auth)

  return (
    <div className='dlist'>
      <div className="column-1">
        <div className="row1">
          <img src={user ? user.user.photo : "https://i.ibb.co/4pDNDk1/avatar.png"} alt="admin" />
          <h1>Admin</h1>
        </div>
        <div className="links">
          <Link to={"/dashboard/home"} >Home</Link>
          <Link to={"/dashboard/allProducts"}>All Product</Link>
          <Link to={"/dashboard/addProduct"}>Add Product</Link>
          <Link to={"/dashboard/orders"}>Orders</Link>
          <Link to={"/dashboard/coupons"}>Coupons</Link>
        </div>
      </div>
    </div>
  )
}

export default List