import React from 'react'
import './card.scss'

const Card = ({img , title}) => {
  return (
    <div className='card'>
        <div className="images">
            <img src={img} alt="img" />
        </div>
        <h3>{title}</h3>
    </div>
  )
}

export default Card