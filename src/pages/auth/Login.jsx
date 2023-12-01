import { useEffect, useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, login } from '../../reducer/features/auth/authSlice'
import Loader from '../../components/loading/Loader'



const Login = () => {

const [email , setEmail] = useState("")
const [password , setPassword] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()

const {user , isSuccess , isLoading} = useSelector((state)=>state.auth)

const loginUser = async(e)=>{
  e.preventDefault()

 
  const userData = {
    email , password
  }
  await dispatch(login(userData))
  // await dispatch(getUser())
}

useEffect(()=>{
  if(isSuccess && user){
    navigate("/")
  }
  dispatch(RESET_AUTH())
},[isSuccess , user , navigate , dispatch])


  return (
   <>
   {isLoading && <Loader/>}
    <div className="login">
        <div className="gif">
            <img src="/images/glassesGif.gif" alt="gif" onClick={()=>{
                toast.error("Login First")
            }}/>
        </div>
        <div className="form">
            <form onSubmit={loginUser}>
                <h1>Login</h1> 
                <input type="email" placeholder='Email' required  name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="password" placeholder='Password'  required name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button>Login</button>
            <p>Don't have an account? <Link to={"/register"} >Sign-Up</Link></p>
            </form>
        </div>
    </div>
   </>
  )
}


export default Login