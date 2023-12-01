import React, { useEffect } from 'react'
import List from '../../components/dashboardList/List'
import ProductCard from '../../components/productCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import './dashboardAllProduct.scss'
import { getAllProducts } from '../../reducer/features/product/productSlice'

const DashboardAllProduct = () => {

  const dispatch = useDispatch()
  const { allProducts } = useSelector((state) => state.product)

  useEffect(() => {

    dispatch(getAllProducts())

  }, [allProducts, dispatch])



  return (
    <>
      {/* {isLoading && <Loader/>} */}
      <div style={{ display: "flex", minHeight: "170vh" }} className='allProductListPage'>
        <List />
        <div className="allProduct" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto", marginBottom: "20px", }}>
          {
            Array.isArray(allProducts) && allProducts.map((data, index) => (
              <ProductCard product={data} key={index} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default DashboardAllProduct