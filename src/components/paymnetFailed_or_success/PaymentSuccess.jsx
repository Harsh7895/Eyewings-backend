import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'
import './paymentSuccess_or_fail.scss'
import { useNavigate } from 'react-router-dom'


const PaymentSuccess = () => {

    const navigate = useNavigate()

    return (
        <div className='success'>
            <AiFillCheckCircle />

            <h1>Payment Done ! </h1>
            <p>Thank you for completing your secure online payment.</p>
            <h2>Have a great day!</h2>

            <button onClick={()=> navigate("/order")}>Go Back</button>
        </div>
    )
}

export default PaymentSuccess