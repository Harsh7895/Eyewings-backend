import { GiAngelWings } from 'react-icons/gi'
import { BsFillTelephoneForwardFill } from 'react-icons/bs'
import { FiPhoneForwarded } from 'react-icons/fi'
import { AiFillShopping, AiOutlineHeart, AiOutlineSearch, AiOutlineShopping, } from 'react-icons/ai'
import { BiSolidDownArrow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import './header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, logout } from '../../reducer/features/auth/authSlice'
import Loader from '../loading/Loader'
import { useState } from 'react'


const activelink = ({ isActive }) => (
  isActive ? "active" : ""
)


const Header = () => {

  const dispatch = useDispatch()
  const { user, isLoading, isLoggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [searchText , setSearchText] = useState("")

  const logoutHandle = async () => {
    await dispatch(logout())
    await dispatch(RESET_AUTH())
    navigate("/login")
  }

  let userName;
  if (user && user.user && user.user.name) {
    userName = user?.user.name
  }
  else {
    userName = "Logout"
  }

  const searchHandler = (e)=>{
    e.preventDefault()
    navigate(`/product/listing/${searchText}`)
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="header">
        <h2 onClick={() => navigate("/")}>Eye<span>Wings</span> <GiAngelWings size={16} /> </h2>
        <h3>
          <BsFillTelephoneForwardFill size={14} /> <a href="tel:7895207783">7895207783</a>
        </h3>
        <form onSubmit={searchHandler}>
          <input type="text" placeholder='What are you looking for?' onChange={(e)=> setSearchText(e.target.value)}/>
        </form>

        <nav>
          {user && user.user.name ?
           (<Link style={{ color: "red" }} className='prof'>
            <div className='prof-1'>  <img src={user && user.user && user?.user.photo ? user.user.photo : "https://i.ibb.co/4pDNDk1/avatar.png"} alt="" /> {userName} <BiSolidDownArrow className='arrow' /></div>
            <div className="prof-2">
              <Link to={"/profile"}>Profile</Link>
              <Link to={"/order"}>My Orders</Link>
             {user &&user.user.role === "customer"? <Link to={"/prescription"}>My Prescriptions</Link>: <Link to={"/dashboard/home"}>Dashboard</Link>}
              <Link onClick={logoutHandle} className='logout'>Logout</Link>
            </div>
          </Link>) : (
            <>
              <Link to={"/login"} className={activelink}>Log-In</Link>
              <Link to={"/register"} className={activelink}>SignUp</Link>
            </>
          )}

          <Link to={"/wishlist"} className={activelink}>
            <AiOutlineHeart /> Whislist
          </Link>
          <Link to={"/cart"} className={activelink}>
            <AiFillShopping /> Cart
          </Link>
          {/* <Link to={"/profile"}>  <CgProfile size={21}/> Profile </Link>   */}
        </nav>
      </div>
      <div className="header-mob1">
        <div className="left">
          <GiAngelWings className='logo' onClick={() => navigate("/")} />
          <a href="tel:7890207783"> <FiPhoneForwarded size={12} /> 7895207783</a>
        </div>
        <div className="right">
          <Link to={"/search"}>  <AiOutlineSearch /> </Link>
          <Link to={"/wishlist"}>  <AiOutlineHeart /> </Link>
          <Link to={"/cart"}>  <AiOutlineShopping /> </Link>
          <Link to={isLoggedIn ? "/profile" : "/login"} id='profile-img'> <img src={user && user.user && user?.user.photo ? user.user.photo : "https://i.ibb.co/4pDNDk1/avatar.png"} alt="" /> </Link>
        </div>
      </div>
    </>
  )
}

export default Header