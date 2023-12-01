import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import './paymentSuccess_or_fail.scss'
import { useNavigate } from 'react-router-dom'

const PaymnetFailed = () => {
    const navigate = useNavigate()
    return (
        <div className='failed'>
            <AiFillPlusCircle />

            <h1>Payment Failed ! </h1>
            <p>Thank you for trying our secure online payment , Try again later.</p>
            <h2>Have a great day!</h2>

            <button onClick={() => navigate("/")}>Try Again Later</button>
        </div>
    )
}

export default PaymnetFailed