import { useEffect } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import './wishlist.scss'
import { useSelector } from 'react-redux'

const Wishlist = () => {
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {

  }, [user])

  return (
    <div className='wishlist'>
      <div className="heading"> <h1>Your Favourites</h1></div>
      <div className='wishlist-items'>
        {
          user && user?.user?.wishListItems.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist