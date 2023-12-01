import React from 'react'
import './loader.scss'
import gif from './loading.jpg'

const Loader = () => {
  return (
    <div className='loader'>
        <img src={gif} alt="loading" />
    </div>
  )
}

export default Loader