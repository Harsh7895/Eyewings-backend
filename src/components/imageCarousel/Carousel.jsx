import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './carousel.scss'


const images= [
    "/images/es1.png", "/images/es2.png" , "https://th.bing.com/th/id/R.b1fdaea278770996350722a30549b100?rik=c%2bb7uDAq8Xw9Jg&riu=http%3a%2f%2fwww.bauschandlomb.in%2fstatic%2fweb%2fimg%2flencare%2flenscare_banner1_mob.jpg&ehk=q1jz9MZ7hfpjgEsJo%2f0Wj2rrNRR2HPD%2fSuLLe%2bPIYtQ%3d&risl=&pid=ImgRaw&r=0"
]

const Caro = () => {
  return (
    <Carousel  className='caro'
        autoPlay={true} infiniteLoop={true} interval={3000} showArrows={false} showIndicators={true} showThumbs={false} showStatus={false}
    >
       {
            images.map((image , index)=>{
                return <img src={image} alt=""  key={index} />
            })
        }
    </Carousel>
  )
}

export default Caro