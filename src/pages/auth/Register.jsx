import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './login.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH,  register } from '../../reducer/features/auth/authSlice'
import Loader from '../../components/loading/Loader'

const initialState = {
  name:"",
  email:"",
  password:"", 
  cpassword:""
}

const Register = () => {

  const [formdata , setFormData] = useState(initialState)
  const {name , email , password , cpassword} = formdata;

  const dispatch = useDispatch()
  const {isLoggedIn , isSuccess , isLoading } = useSelector((state)=>state.auth)
  const navigate = useNavigate()

  const handleInputChange = (e)=>{
    const {name , value} = e.target
    setFormData({...formdata , [name]:value})
  }

  const registerUser = async(e) =>{
    e.preventDefault()
    if(password !== cpassword){
      return toast.error("Password does'nt matched")
    }
    const userData = {
      name , email , password
    }
    await dispatch(register(userData))
  }

  useEffect(() => {
   if(isSuccess && isLoggedIn){
    navigate("/")
   }
   dispatch(RESET_AUTH())
  }, [dispatch , navigate , isSuccess , isLoggedIn])
  

  return (
 <>
 {isLoading && <Loader/>}
    <div className="register">
    <div className="form">
        <form onSubmit={registerUser} >
            <h1>Sign Up</h1>
            <input type="text" placeholder='Name' required name='name' value={name} onChange={handleInputChange}/>
            <input type="email" placeholder='Email' required name='email' value={email}  onChange={handleInputChange}/>
            <input type="password" placeholder='Password'  required name='password' value={password} onChange={handleInputChange}/>
            <input type="password" placeholder='Confirm Password'  required name='cpassword' value={cpassword} onChange={handleInputChange}/>
            <button>Sign Up</button>
        <p>Already have an account? <Link to={"/login"} >Login</Link></p>
        </form>
    </div>
    <div className="gif">
        <img src="/images/glassesGif.gif" alt="gif" onClick={()=>{
            toast.error("Sign Up First")
        }}/>
    </div>
</div>
 </>
  )
}



export default Register;