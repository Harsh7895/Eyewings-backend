import React, { useEffect } from 'react'
import Card from '../components/glassesCard/Card'
import './home.scss'
import { BiStore } from 'react-icons/bi'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Caro from '../components/imageCarousel/Carousel'
import Choice from '../components/frameChoice/Choice'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/productCard/ProductCard'
import { getAllProducts } from '../reducer/features/product/productSlice'

const location = "https://www.google.com/maps/place/Eyewings+opticals/@27.1452777,78.0397023,17z/data=!3m1!4b1!4m6!3m5!1s0x3974718cd52a7fcd:0xa0aebe3f000f1a27!8m2!3d27.1452729!4d78.0422772!16s%2Fg%2F11trrgbmqx?entry=ttu"

const glasses = [
    {
        img: "https://static1.lenskart.com/media/desktop/img/Apr22/a2.png",
        title: "Eyeglasses"
    },
    {
        img: "https://static1.lenskart.com/media/desktop/img/Apr22/b2.png",
        title: "Sunglasses"
    },
    {
        img: "https://static1.lenskart.com/media/desktop/img/Apr22/d2.png",
        title: "Computer Glasses"
    },
    {
        img: "https://static1.lenskart.com/media/desktop/img/Apr22/d.png",
        title: "Contact Lenses"
    },
    {
        img: "https://static1.lenskart.com/media/desktop/img/Apr22/e2.png",
        title: "Power Glasses"
    },
    {
        img: "https://static1.lenskart.com/media/desktop/img/June22/prog11.jpg",
        title: "Progressive Lenses"
    }
]

const Home = () => {

    const dispatch = useDispatch()
    const {allProducts} = useSelector((state)=>state.product)
    useEffect(()=>{
        if(!allProducts){
            dispatch(getAllProducts())
        }
    },[dispatch, allProducts])

    const navigate = useNavigate()

    return (
        <div className='home'>
            <div className='row' >
                {
                    glasses.map((data, index) => (
                        <Card img={data.img} title={data.title} key={index} />
                    ))
                }
            </div>
            <div className="mob-link">
                <Link to={location}>
                    <BiStore />
                    <div>
                        <p>Buy at</p>
                        <span>Store</span>
                    </div>
                </Link>
                <Link to="https://wa.me/918439809398/?text=Hey chutiye, Whatsup">
                    <AiOutlineWhatsApp />
                    <div>
                        <p>Buy on</p>
                        <span>Chat</span>
                    </div>
                </Link>
            </div>
            <Caro />
            <div className="hero-text">
                <p>Our Purpose</p>
                <h1>Quality Fashion in Reasonable Price</h1>
                <div class="text-box">
                    <Link to={""} className="btn btn-white btn-animate">Discover Now</Link>
                </div>
            </div>
            <Choice/>

                <h1 className='new-collection'>New <span>Collection</span>  <button onClick={()=> navigate("/product/listing/all")}>View More</button></h1>
                <hr className='hr'/>
            <section className='products-slider'>
                {   
                    allProducts?.map((item, index)=>(
                        <ProductCard product={item} key={index}/>
                    ))
                }

                <p>Slide for more >>></p>
            </section>
        </div>
    )
}

export default Home