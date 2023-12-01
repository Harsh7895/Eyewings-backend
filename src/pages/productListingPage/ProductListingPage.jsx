import React, { useEffect, useState } from 'react'
import './productListingPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import {FaFilter, FaPlus} from 'react-icons/fa'
import ProductCard from '../../components/productCard/ProductCard'
import { getAllProducts, resetFilterProduct } from '../../reducer/features/product/productSlice'
import ProductListPageSideBar from '../../components/search and sorting comp/ProductListPageSideBar'
import { useParams } from 'react-router-dom'

const ProductListingPage = () => {

  const dispatch = useDispatch()
  const [showFilterList, setShowFilterList] = useState(true)
  const [showCross , setShowCross] = useState(true)
  const { allProducts, filters } = useSelector((state) => state.product)
  const [filteredProducts, setFilteredProducts] = useState([])
  const { searchText } = useParams();
  const [sortBy, setSortBy] = useState('')


  const { selectedPrice, selectedColor, selectedShape, gender, categories } = filters
  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProducts())
      dispatch(resetFilterProduct())
    }
  }, [allProducts, dispatch])

  // console.log(searchText)
  useEffect(() => {

    if (allProducts) {
      const filtered = allProducts.filter((product) => {
        // Apply your filtering logic here based on the filter values
  
        // Check if searchText matches any of the specified fields
        const searchTextMatch =
          (!searchText || product.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.brand.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.model.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.color.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.category.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.frameMaterial.toLowerCase().includes(searchText.toLowerCase())) ||
          (!searchText || product.lensMaterial.toLowerCase().includes(searchText.toLowerCase()));
  
        // Additional filtering conditions
        const otherConditions =
          (selectedColor === 'all' || product.color === selectedColor) &&
          (selectedShape === 'all' || product.category === selectedShape) &&
          (gender === 'unisex' || product.gender === gender);
  
        // Combine searchTextMatch and otherConditions with logical AND
        return searchTextMatch && otherConditions;
      });
  
      const sortedProducts = sortProducts(filtered, sortBy);

      setFilteredProducts(sortedProducts);
    }
  }, [allProducts, selectedPrice, selectedColor, selectedShape, gender, categories, searchText ,  sortBy]);

  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case 'lowToHigh':
        return [...products].sort((a, b) => a.price - b.price);
      case 'highToLow':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setShowFilterList(false);
        setShowCross(false)
      } else {
        setShowCross(true)
        setShowFilterList(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    <div className='product-listing-page'>
      {showFilterList && <div className="showfilterProduct"  >
        <p onClick={()=> setShowFilterList(false)}>  Filter <FaFilter/></p>
      </div>}
      { showCross && !showFilterList  && <div className="cross"  >
        <p onClick={()=> setShowFilterList(true)}>  <FaPlus/></p>
      </div>}
      {!showFilterList && !searchText && <ProductListPageSideBar />}
      <div className="product-listing">
        <h1>Be the best. Wear the best</h1>
        <select
          name="sortBy"
          id="sortBy"
          className='sortBy'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <div className="products">
          {filteredProducts.length === 0 && <h1 className='noProduct'>No Product Found</h1>}
          {filteredProducts && filteredProducts?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage 