import React, { useState } from 'react'
import List from '../../components/dashboardList/List'
import './dashboardAddProduct.scss'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../reducer/features/product/productSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/loading/Loader'

const initialState = {
    name: "", sku: "", category: "", brand: "", model: "", availability: true, color: "", frameMaterial: "", lensMaterial: "", lensColor: "", prescriptionRequired: false, quantity: 0, regularPrice: 0, price: 0, description: "", frameType:""
    
}

const DashboardAddProduct = () => {

    const [images, setImages] = useState([])
    const [formData, setFormData] = useState(initialState)

    const { name, sku, category, brand, model, availability, color, frameMaterial, lensMaterial, lensColor, prescriptionRequired, quantity, regularPrice, price, description, gender , frameType } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onDrop = (acceptedfiles) => {
        setImages(acceptedfiles)
    }

    const remove = (index) => {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: `image/*` })

    // const { product } = useSelector((state) => state.product)


    
    const savePhoto = async (e) => {
        let newImage = [];
        e.preventDefault()

        let imgURl;
        const cloud_name = "eyewingsmycloud"
        const upload_preset = "EyeWings"
        const url = "https://api.cloudinary.com/v1_1/eyewingsmycloud/image/upload"

        try {
            for (let i = 0; i < images.length ; i++) {
                const image = new FormData()
                image.append("file", images[i])

                image.append("cloud_name", cloud_name)
                image.append("upload_preset", upload_preset)

                const response = await fetch(url, {
                    method: "post", body: image
                })
                const imgData = await response.json()

                imgURl = imgData.url.toString()
                newImage.push(imgURl)
            }
            setImages([])
            return newImage
        } catch (error) {
            toast.error(error)
            return null
        }
    }


    const dispatch = useDispatch()
    const create = async(e) => {
        e.preventDefault()

        if (!name || !category || !brand || !availability || !price || !description) {
            return toast.error("Please add all the details")
        }
        try {
            const newImage = await savePhoto(e);
    
            if (newImage.length === 0) {
                return toast.error("nahi hua")
            }
    
    
            const productData = {
                name,
                sku,
                category,
                brand,
                model,
                color,
                availability,
                frameMaterial,
                lensMaterial,
                lensColor,
                prescriptionRequired,
                quantity,
                regularPrice,
                price,
                description,
                images: newImage,
                gender,
                frameType
            };
    
    
            await dispatch(createProduct(productData));
            setFormData(initialState);
        } catch (error) {
            toast.error(error);
        }
    }

    const {isLoading} = useSelector((state)=>state.product)

    return (
        <>
        {isLoading && <Loader/>}
        <div style={{ display: "flex", width: "100%" }} className='addProductPage'>
            <List />
            <div className='addProduct' >
                <h1>Create A Product</h1>
                <form onSubmit={create}>
                    <div>
                        < div {...getRootProps()} className='dropzone'>
                            <input {...getInputProps()} />
                            <p>Drag and drop here</p>
                        </div>
                        <div className="image-preview">
                            {
                             images &&   images.map((file, index) => {
                                    return <div className='image-container' key={index}>
                                        <img src={URL.createObjectURL(file)} alt={`Preview${index}`} />
                                        <button onClick={() => remove(index)}>Remove</button>
                                    </div>
                                })
                            }
                        </div>
                        {/* <button className='btn' onClick={savePhoto}>Upload</button> */}
                    </div>
                    <div className="input-fields">
                        <p>
                            <label>Name</label>
                            <input type="text" name='name' value={name} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>SKU</label>
                            <input type="text" name='sku' value={sku} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Frame Type</label>
                            <input type="text" name='frameType' value={frameType} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Gender</label>
                            <input type="text" name='gender' value={gender} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Category</label>
                            <input type="text" name='category' placeholder='Shape of the frame' value={category} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Brand</label>
                            <input type="text" name='brand' value={brand} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Model</label>
                            <input type="text" name='model' value={model} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Availaibilty</label>
                            <select name="availability" value={availability} onChange={handleInputChange} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </p>
                        <p>
                            <label>Prescription Required</label>
                            <select name="prescriptionRequired" value={prescriptionRequired} onChange={handleInputChange} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </p>
                        <p>
                            <label >Color</label>
                            <input type="text" name='color' value={color} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>FrameMaterial</label>
                            <input type="text" name='frameMaterial' value={frameMaterial} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label >LensMaterial</label>
                            <input type="text" name='lensMaterial' value={lensMaterial} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label >LensColor</label>
                            <input type="text" name='lensColor' value={lensColor} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label htmlFor="">Quantity</label>
                            <input type="number" name='quantity' value={quantity} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label >RegularPrice</label>
                            <input type="number" name='regularPrice' value={regularPrice} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label >Price</label>
                            <input type="number" name='price' value={price} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label >Description</label>
                            <textarea name="description" value={description} onChange={handleInputChange} id="" cols="30" rows="10"></textarea>
                        </p>
                    </div>

                    <button className='btn' onSubmit={create}>Submit</button>

                </form>
            </div>
        </div>
        </>
    )
}

export default DashboardAddProduct