import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/header/Header';
import Login from './pages/auth/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/auth/Register';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  getUser, loginStatus } from './reducer/features/auth/authSlice';
import Profile from './pages/profile/Profile';
import Footer from './components/footer/Footer';
import Mfooter from './components/footer/Mfooter';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardAddProduct from './pages/dashboard/DashboardAddProduct';
import DashboardAllProduct from './pages/dashboard/DashboardAllProduct';
import { getAllProducts } from './reducer/features/product/productSlice';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import ProductPage from './pages/productPage/ProductPage';
import BuyPage from './pages/buyPage/BuyPage';
import PaymentSuccess from './components/paymnetFailed_or_success/PaymentSuccess';
import PaymnetFailed from './components/paymnetFailed_or_success/PaymnetFailed';
import ProductListingPage from './pages/productListingPage/ProductListingPage';
import UserOrders from './pages/user-ordersPage/UserOrders';
import DashboardOrders from './pages/dashboardOrders/DashboardOrders';


function App() {

  axios.defaults.withCredentials=true
  const dispatch = useDispatch()

const {isLoggedIn , user} = useSelector(state =>state.auth)

  useEffect(()=>{
    dispatch(getUser())
    dispatch(loginStatus())
  },[dispatch])

  const { allProducts } = useSelector((state) => state.product)

  useEffect(() => {
    if (allProducts === null) {
      dispatch(getAllProducts())
    }
  }, [allProducts, dispatch])

  return (
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={isLoggedIn?<Profile/>:<Home/>}/>
        <Route path='/dashboard/home' element={user?.user.role === "admin"?<Dashboard/>:<Home/>}/>
        <Route path='/dashboard/allProducts' element={user?.user.role === "admin"?<DashboardAllProduct/>:<Home/>}/>
        <Route path='/dashboard/addProduct' element={user?.user.role === "admin"?<DashboardAddProduct/>:<Home/>}/>
        <Route path='/dashboard/orders' element={user?.user.role === "admin"?<DashboardOrders/>:<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<UserOrders/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/product/checkout/:id' element={<BuyPage />} />
        <Route path='/checkout/complete/:id' element={<PaymentSuccess/>} />
        <Route path='/checkout/failed/:id' element={<PaymnetFailed/>} />
        <Route path='/product/listing/:searchText' element={<ProductListingPage/>} />
        <Route path='/product/listing/all' element={<ProductListingPage/>} />
      </Routes>
      <Footer/>
      <Mfooter/>
    </BrowserRouter>
  );
}

export default App;
