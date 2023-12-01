import React, { useEffect, useState } from 'react'
import './productlistPageSidebar.scss'
import { AiFillFilter } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts , setCategories , setGender  , setSelectedPrice , setSelectedColor , setSelectedShape   } from '../../reducer/features/product/productSlice'

const ProductListPageSideBar = () => {

    const dispatch = useDispatch()

    const { allProducts , filters } = useSelector((state) => state.product)
    const [colorIndex, setColorIndex] = useState(4)

    const uniqueColors = [];
    const seenColors = new Set();

    useEffect(()=>{
        if(!allProducts){
            dispatch(getAllProducts())
        }
    },[allProducts , dispatch])

   allProducts && allProducts.forEach((product) => {
        const { color, colorName } = product;
        const colorKey = `${colorName}-${color}`;

        if (!seenColors.has(colorKey)) {
            seenColors.add(colorKey);
            uniqueColors.push({ colorName, color });
        }
    })

    const handleSelectedColor = (e) => {
        dispatch(setSelectedColor(e.target.value))
    }
    const handleSelectedShape = (e) =>{
        dispatch(setSelectedShape(e.target.value))
    }
    const handleGender = (e)=>{
        dispatch(setGender(e.target.value))
    }
    const handleCategories = (e)=>{
        dispatch(setCategories(e.target.value))
    }
    const handleSelectedPrice = (e)=>{
        dispatch(setSelectedPrice(e.target.value))
    }

    return (
        <div className='product-sidebar'>
            
            <h2>{filters.gender} > {filters.categories}</h2>

            <h4>Filter Products <AiFillFilter/></h4>

            <div className="gender-categories">
                <select name="gender" id="" value={filters.gender} onChange={handleGender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                </select>

                <select name="categories" id="" value={filters.categories} onChange={handleCategories}>
                    <option value="all">all</option>
                    <option value="Eyeglasses">EyeGlasses</option>
                    <option value="sunglasses">SunGlasses</option>
                    <option value="computer glasses">Computer Glasses</option>
                </select>
            </div>

            <div className="colors">
                <h4>Colors </h4>
                <p > <input type="radio" value={"all"} checked={"all" === filters.selectedColor} onChange={handleSelectedColor} />    <div>{"All"}</div>    </p> 
                {
                    uniqueColors && uniqueColors.map((product, index) => (
                        index <= colorIndex ? <p key={index}> <input type="radio" value={product.color} checked={product.color === filters.selectedColor} onChange={handleSelectedColor} />    <div>{product.color}</div>   <span style={{ backgroundColor: `${product.color}` }}></span> </p> : ""
                    ))
                }
                {uniqueColors?.length > 5 && <div className='view-more' onClick={() => setColorIndex(colorIndex + 5)}>View more({uniqueColors.length - 5})</div>}
            </div>

            <div className="shapes">
                <h4>Shapes </h4>
                <p > <input type="radio" value={"all"} checked={"all" === filters.selectedShape} onChange={handleSelectedShape} />    <div>{"All"}</div>    </p> 
                <p > <input type="radio" value={"round"} checked={"round" === filters.selectedShape} onChange={handleSelectedShape} />    <div>Round</div>  </p>
                <p > <input type="radio" value={"rectangle"} checked={"rectangle" === filters.selectedShape} onChange={handleSelectedShape} />    <div>Rectangle</div>  </p>
                <p > <input type="radio" value={"circle"} checked={"circle" === filters.selectedShape} onChange={handleSelectedShape} />    <div>Circle</div>  </p>
                <p > <input type="radio" value={"square"} checked={"square" === filters.selectedShape} onChange={handleSelectedShape} />    <div>Square</div>  </p>
                {filters.gender === "female" &&  <p > <input type="radio" value={"cat-eye"} checked={"cat-eye" === filters.selectedShape} onChange={handleSelectedShape} />    <div>Cat-Eye</div>  </p>}
            </div>

            <div className="prices">
                <h4>Price Ranges</h4>
                <p><input type="radio" value={"300"} checked={"300" === filters.selectedPrice} onChange={handleSelectedPrice} />   <div>₹0 - ₹300</div></p>
                <p><input type="radio" value={"600"} checked={"600" === filters.selectedPrice} onChange={handleSelectedPrice}/>   <div>₹300 - ₹600</div></p>
                <p><input type="radio" value={"1000"} checked={"1000" === filters.selectedPrice} onChange={handleSelectedPrice}/>   <div>₹600 - ₹1000</div></p>
                <p><input type="radio" value={"2000"} checked={"2000" === filters.selectedPrice} onChange={handleSelectedPrice}/>   <div>₹1000 - ₹2000</div></p>
                <p><input type="radio" value={"more than 2000"} checked={"more than 2000" === filters.selectedPrice} onChange={handleSelectedPrice}/>   <div>more than ₹2000</div></p>
            </div>
        </div>
    )
}

export default ProductListPageSideBar