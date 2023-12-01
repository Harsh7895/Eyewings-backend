import React from 'react'
import "./choice.scss"
import { Link } from 'react-router-dom'

const cardArr = [
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/image179.png", 
        title:"Rounded",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg", 
        title:"Cat-Eye",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg", 
        title:"ClubMaster",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg", 
        title:"Transparent",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg", 
        title:"Blend-Edit",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/clipon.jpg", 
        title:"Blend-Edit",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg", 
        title:"Air Flex",
    },
    {
        img:"https://static1.lenskart.com/media/desktop/img/Sep21/aviator.jpg", 
        title:"Retro Aviator",
    },
]

const Card = ({image , title, type})=>{
    return(
        <div className="card">
            <img src={image} alt="" />
            <h3>{title}</h3>
            <Link to={type}>Explore</Link>
        </div>
    )
}

const Choice = () => {
  return (
    <div className='container'>
        <div className="sec1">
            <h1>WEAR THE</h1>
            <h2>TREND</h2>
            <p>Our hottest collections</p>
        </div>
        <div className="sec2">
         <div className="sec2-1">
         {
            cardArr.map((data , index)=>{
                return <Card image={data.img} title={data.title} type={data.title} key={index}/>
            })
          }
         </div>
        </div>
    </div>
  )
}

export default Choice