import React, { useEffect, useState } from 'react'
import './profile.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getUser, updatePhoto, updateUser } from '../../reducer/features/auth/authSlice'
import Loader from '../../components/loading/Loader'
import { toast } from 'react-toastify'

const Profile = () => {

    const { user, isLoading } = useSelector((state) => state.auth)
    const initialState = {
        name: user?.user.name || "",
        email: user?.user.email || "",
        phone: user?.user.phone || "",
        role: user?.user.role || "",
        photo: user?.user.photo || "",
        gender: user?.user.gender || "",
        address: user?.user.address || "",
        state: user?.user.state || ""
    }
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setimagePreview] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        if (user === null) {
            dispatch(getUser())
        }
        setProfile({
            name: user?.user.name || "",
            email: user?.user.email || "",
            phone: user?.user.phone || "",
            role: user?.user.role || "",
            photo: user?.user.photo || "",
            gender: user?.user.gender || "",
            address: user?.user.address || "",
            state: user?.user.state || ""
        })
    }, [dispatch, user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile({ ...profile, [name]: value })
    }

    const saveProfile = async (e) => {
        e.preventDefault()
        const userData = {
            name: profile.name,
            phone: profile.phone,
            gender: profile.gender,
            address: profile.address,
            state: profile.state,
        }

        await dispatch(updateUser(userData))
        toast.success("Updated Succesfully")
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
        setimagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const savePhoto = async (e) => {
        e.preventDefault()
        let imageUrl;
        const cloud_name = "eyewingsmycloud";
        const upload_preset = "EyeWings";
        const url = "https://api.cloudinary.com/v1_1/eyewingsmycloud/image/upload"

        try {
            if (
                profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/png" || profileImage.type === "image/jpg")
            ) {
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", cloud_name)
                image.append("upload_preset", upload_preset)

                // Save image to cloudnary
                const response = await fetch(url, {
                    method: "post", body: image
                })
                const imgData = await response.json()
                imageUrl = imgData.url.toString()

                // save imgae to mongoDb
                const userPhoto = {
                    photo: profileImage ? imageUrl : profile.photo
                }
                await dispatch(updatePhoto(userPhoto))
                setimagePreview(null)
                toast.success("Profile Changed")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="profile">
                <div className='prof-header'>
                    <div className='one'>.</div>
                    <h2>Eye <span>Wings</span></h2>
                    <div className='two'>.</div>
                </div>
                <div className="prof-section">
                    <div className="left">
                        <div className="top">
                            <Link to={"/order"} className='item-1'>My Orders</Link>
                           {user.user.role === "customer" ? ( <Link to={"/prescription"} className='item-2'>My prescription</Link>):(
                             <Link to={"/dashboard/home"} className='item-2'>Dashboard</Link>
                           )}
                            <Link to={"/changePassword"} className='item-3'>Change Password</Link>
                            <Link to={"/whislist"} className='item-4'>My Whislist</Link>
                            <Link to={"/cart"} className='item-5'>Go to Cart</Link>
                        </div>
                        <div className="btm">
                            <Link to={"/login"}>Logout</Link>
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={saveProfile}>
                            {isLoading ? <Loader /> : (
                                <>
                                    <h1>Edit Account Information</h1>
                                    <div className="img-prof">
                                        <img src={imagePreview === null ? profile.photo : imagePreview} alt="Profile" />
                                        <h3>Harsh</h3>
                                        <div className="edit1">
                                            {imagePreview === null && <label htmlFor='ProfImage'>
                                                <p >Change Image</p>
                                            </label>}
                                            {imagePreview !== null && <label >
                                                <p onClick={savePhoto}>Upload Image</p>
                                            </label>}
                                            <input type="file" accept='image/*' name='image' onChange={handleImageChange} id='ProfImage' />
                                        </div>
                                    </div>
                                    <div className="edit2">
                                        {imagePreview === null && <label htmlFor='ProfImage'>
                                            <p >Change Image</p>
                                        </label>}
                                        {imagePreview !== null && <label >
                                            <p onClick={savePhoto}>Upload Image</p>
                                        </label>}
                                        <input type="file" accept='image/*' name='image' onChange={handleImageChange} id='ProfImage' />
                                    </div>

                                    <h2>Account Information</h2>

                                    <label>Name </label>
                                    <input type="text" name='name' placeholder='Enter your name' value={profile.name} onChange={handleInputChange} />

                                    <p>
                                        <label>Email</label>
                                        <input type="email" readOnly id='email' value={profile.email} />
                                    </p>

                                    <label>Gender</label>
                                    <select name="gender" value={profile.gender} onChange={handleInputChange} >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <div className="add">
                                        <p>
                                            <label>Mobile No.</label>
                                            <input type="text" name='phone' placeholder='Mobile number' value={profile.phone} onChange={handleInputChange} />
                                        </p>
                                        <p>
                                            <label>State</label>
                                            <input type="text" name='state' placeholder='Your State' value={profile.state} onChange={handleInputChange} />
                                        </p>
                                    </div>
                                    <label>Address</label>
                                    <input type="text" name='address' placeholder='Your address' value={profile.address} onChange={handleInputChange} />

                                    <button>Save & Continue</button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile