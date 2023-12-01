import React from 'react'
import ProductCard from '../productCard/ProductCard'
import './relatedProducts.scss'

const RelatedProducts = ({allproducts}) => {
    
  return (
    <div className='related-projects' >
        <div className="heading" >
            <h2 >Related Products</h2>
            <button >View More > > ></button>
        </div>
        <hr style={{color:'grey' , height:"1px" , backgroundColor:"grey", width:"100%"}}/>
        <div className="products" >
            {
                allproducts?.map((item , index)=>(
                    <ProductCard product={item} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export const AllProducts = ({allproducts}) =>{
    return (
        <div className='related-projects' >
            <div className="heading">
                <h2 >All Products  <span>({allproducts.length} products)</span></h2>
                <button >View More > > ></button>
            </div>
            <hr style={{color:'grey' , height:"1px" , backgroundColor:"grey", width:"100%"}}/>
            <div className="products">
                {
                    allproducts?.map((item , index)=>(
                        <ProductCard product={item} key={index}/>
                    ))
                }
            </div>
        </div>
      )
}

export default RelatedProducts