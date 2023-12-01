import "./dashboard.scss"
import List from '../../components/dashboardList/List'
import { BsCart4, BsCashCoin } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa6'

import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllProducts } from "../../reducer/features/product/productSlice"
import Loader from "../../components/loading/Loader"

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
  )



const Dashboard = () => {

  const data= {
    labels: ['Processing', 'Shipped', 'Delivered', 'Placed'],
    datasets: [
      {
        label: 'Order Count',
        data: [10 , 2, 3, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  }

  const dispatch = useDispatch()
  const { allProducts, isLoading } = useSelector((state) => state.product)
 

  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProducts())
    }
  }, [allProducts, dispatch])

  

  return (
   <>
   {isLoading && <Loader/>}
    <div className='dashboard'>
       <List /> 
     <div className="home">
        <h1>Admin Home  </h1>
        <div className="cards">
          <div className="card cone">
            <h3>Earnings</h3>
            <div className="info">
              <h2>$6280</h2>
              <BsCashCoin />
            </div>
          </div>
          <div className="card ctwo">
            <h3>Products</h3>
            <div className="info">
              <h2>{allProducts?allProducts.length:""}</h2>
              <BsCart4 />
            </div>
          </div>
          <div className="card cthree">
            <h3>Orders</h3>
            <div className="info">
              <h2>35</h2>
              <FaCartPlus />
            </div>
          </div>
        </div>
        <div className="chart">
          <h2>Order Status Chart</h2>
          <Bar data={data}  />
        </div>
      </div>
    </div>
   </>
  )
}

export default Dashboard