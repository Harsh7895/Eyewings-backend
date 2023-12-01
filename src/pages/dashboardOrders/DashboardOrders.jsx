import './dashboardOrders.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import List from '../../components/dashboardList/List'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { allOrders, updateOrderStatus } from '../../reducer/features/product/productSlice'
import { useNavigate } from 'react-router-dom'

const DashboardOrders = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {dashboardAllOrders} = useSelector((state)=> state.product)
    useEffect(()=>{
            dispatch(allOrders())
    },[dispatch , dashboardAllOrders])

    const handleOrderStatus = async(e ,userId , productId , orderId )=>{
        const userData = {
            userId:userId,
            productId:productId,
            orderStatus:e.target.value,
            orderId:orderId
        }
        await dispatch(updateOrderStatus(userData))
    }

    return (
        <div className='dashboard-orders'>
            <List />
            <div className="allOrders">
                <div className="top">
                    <h1>All Orders</h1>
                    <div className="search">
                        <input type="text" placeholder='Search by Name..' />
                        <AiOutlineSearch />
                    </div>
                </div>

                <div className="orders">
                    {
                        dashboardAllOrders && dashboardAllOrders.map((order , index)=>(
                            <div className="order" key={index}>
                                <div>
                                    {index +1}.
                                </div>

                                <div>
                                    <p>
                                        User Id
                                    </p>
                                    <p style={{color:"blue" , cursor:"pointer"}}>
                                        {order.user}
                                    </p>
                                </div>
                                <div>
                                    <p >
                                        Product Id
                                    </p>
                                    <p style={{color:"blue", cursor:"pointer"}} onClick={()=> navigate(`/product/${order.product}`)}>
                                        {order.product}
                                    </p>
                                </div>
                                <div>
                                    <p >
                                        Amount Paid :- 
                                    </p>
                                    <p >
                                        {order.amount && order.amount/100}
                                    </p>
                                </div>

                                <div style={{color:"green" , cursor:"pointer" , whiteSpace:"nowrap"}} className='status'>
                                   <select name="orderStatus" id="" onChange={(e)=> handleOrderStatus(e , order.user , order.product , order._id)}>
                                    <option value={order.orderStatus}> {order.orderStatus.toUpperCase()}</option>
                                    {order.orderStatus !== "order confirmed" &&  <option value="order confirmed" >Order Confirmed</option>}
                                    {order.orderStatus !== "shipped" &&  <option value="shipped">Shipped</option>}
                                   {order.orderStatus !== "out for delivery" &&  <option value="out for delivery">Out for Delivery</option>}
                                   {order.orderStatus !== "delivered" &&   <option value="shipped">Delivered</option>}
                                   </select>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardOrders