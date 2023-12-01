import React from 'react'
import "./footer.scss"
import { Link } from 'react-router-dom'
import {AiFillInstagram , AiFillFacebook , AiFillTwitterSquare} from 'react-icons/ai'

const location = "https://www.google.com/maps/place/Eyewings+opticals/@27.1452777,78.0397023,17z/data=!3m1!4b1!4m6!3m5!1s0x3974718cd52a7fcd:0xa0aebe3f000f1a27!8m2!3d27.1452729!4d78.0422772!16s%2Fg%2F11trrgbmqx?entry=ttu"

const Mfooter = () => {
    return (
        <div className='main-footer'>
            <div className="main">
                <div className="left">
                    <div className="list">
                        <h3>Services
                            <span></span>
                        </h3>
                        <ul>
                            <li><Link to={location}>Store Locator</Link></li>
                        </ul>
                    </div>
                    <div className="list">
                        <h3 >About Us
                            <span></span>
                        </h3>
                        <ul>
                            <li>Refer and Earn</li>
                            <li>About us</li>
                            <li>Eyewings Coupons</li>
                        </ul>
                    </div>
                    <div className="list">
                        <h3>Help
                            <span></span>
                        </h3>
                        <ul>
                            <li><a href="tel:7890207783">Call Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <h2>Follow Us</h2>
                    <div className="links">
                        <Link to={"https://www.instagram.com/harshthakur.09/"}><AiFillInstagram /></Link>
                        <Link to={"/"}><AiFillFacebook  /></Link>
                        <Link to={"/"}><AiFillTwitterSquare /></Link>
                    </div>
                </div>
            </div>
            <hr />
            <p> &copy;{new Date().getFullYear} All Rights are Reserved </p>
        </div>
    )
}

export default Mfooter