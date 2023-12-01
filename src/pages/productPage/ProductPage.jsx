import { useDispatch, useSelector } from 'react-redux'
import './ProductPage.scss'
import { useEffect, useState } from 'react'
import { BiImageAdd, BiSolidCart } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import { MdVerified } from 'react-icons/md'
import { AiFillDelete, AiFillStar, AiOutlineThunderbolt } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { deleteReview, getAllProducts, getAproduct, reviewAproduct } from '../../reducer/features/product/productSlice'
import { updateCartItemsQuantity, updateUser } from '../../reducer/features/auth/authSlice'
// import Loader from '../../components/loading/Loader'
import RelatedProducts, { AllProducts } from '../../components/relatedProducts/RelatedProducts'




const ProductPage = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const { product, allProducts } = useSelector((state) => state.product)
    const { id } = useParams()

    const [activeImage, setActiveImage] = useState('')
    useEffect(() => {
        if (product?.images && product?.images?.length > 0) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    useEffect(() => {

        const getUser = async () => {
            if (!allProducts) {
                return await dispatch(getAllProducts())
            }
        }
        getUser()
    }, [dispatch, allProducts])


    useEffect(() => {
        const getProduct = async () => {
            // Fetch the product based on the URL parameter
            await dispatch(getAproduct(id));
        };

        getProduct();
    }, [dispatch, id]);

    // const location = useLocation();
    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const reviewParam = queryParams.get('review');
    //     const textarea = document.getElementById('myTextarea');
    //     if (textarea && reviewParam) {
    //       textarea.scrollIntoView({ behavior: 'smooth' });
    //     }
    //   }, [location]);

    const copiedProduct = { ...product }
    const model = copiedProduct?.model
    let filteredProducts = allProducts?.filter(products => products.model === model)

    const handleActiveImage = (index) => {
        setActiveImage(product?.images[index])
    }


    const handleAddtoCart = async () => {
        if (!user) {
            return toast.error("Login first")
        }
        for (let i = 0; i < user?.user?.cartItems?.length; i++) {
            if (user.user.cartItems[i]._id === product._id) {
                const userData = {
                    index: i, quantity: Number(user.user.cartItems[i].quantity) + 1
                }
                await dispatch(updateCartItemsQuantity(userData))
                navigate("/cart")
                return
            }
        }
        const copiedProduct = { ...product }
        copiedProduct.quantity = 1;

        const userData = {
            cartItem: copiedProduct
        }
        await dispatch(updateUser(userData))
        navigate("/cart")
    }

    const handleChangeProductFromColor = (item) => {
        if (item) {
            navigate(`/product/${item._id}`)
        }
    }

    // review and rating functionality
    const [reviewImage, setReviewImage] = useState([])
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [showSubmitBtn, setShowSubmitBtn] = useState(true)

    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleImageChange = (e) => {
        const files = e.target.files
        const imageArray = Array.from(files)
        setReviewImage(imageArray)
    }
    const handleImageDelete = (index) => {
        const images = reviewImage.slice()
        images.splice(index, 1)
        setReviewImage(images)
    }

    
    const submitReview = async (state) => {
        setShowSubmitBtn(false)
        let reviewImages = [];
        let imgURl;
        const cloud_name = "eyewingsmycloud"
        const upload_preset = "EyeWings"
        const url = "https://api.cloudinary.com/v1_1/eyewingsmycloud/image/upload"

        if(!user){
            navigate("/login")
            return toast.error("Login First")
        }

        if (review === "") {
            return toast.error("Add a review also")
        }

        try {
            for (let i = 0; i < reviewImage.length; i++) {
                const image = new FormData()
                image.append("file", reviewImage[i])

                image.append("cloud_name", cloud_name)
                image.append("upload_preset", upload_preset)

                const response = await fetch(url, {
                    method: "post", body: image
                })
                const imgData = await response.json()

                imgURl = imgData.url.toString()
                reviewImages.push(imgURl)
            }
            const reviewData = {
                data: {
                    star: rating,
                    review: review,
                    reviewImages
                },
                id: product._id
            }
            console.log(reviewData)
            await dispatch(reviewAproduct(reviewData))
            setReviewImage([])
            setReview("")
            setRating(0)
            setShowSubmitBtn(true)

        } catch (error) {
            toast.error(error)
            return null
        }
    }



    const handleReviewDelete = async (reviewId) => {
        const userData = {
            id: {
                userId: reviewId
            },
            productId: product._id
        }
        try {
            await dispatch(deleteReview(userData));
        } catch (error) {
            console.error('Error while deleting review', error);
        }
    }

    return (
        <>
            {/* {isLoading && <Loader />} */}
            {
                product && product.images && allProducts && <div className='product-page'>
                    <div className="hero">
                        <div className="left-side">
                            <img src={activeImage ? activeImage : product?.images[0]} alt={product?.name} className='main-img' />
                            <div className="thumbnails">
                                {
                                    product?.images?.map((image, index) => (
                                        <img src={image} alt={product?.name} key={index} onMouseEnter={() => handleActiveImage(index)} onClick={() => handleActiveImage(index)} />
                                    ))
                                }
                            </div>
                            <div className="btn">
                                <button id='cart' onClick={handleAddtoCart} ><BiSolidCart /> Go to Cart</button>
                                <button id='buy' onClick={()=> navigate(`/product/checkout/${product._id}`)}><AiOutlineThunderbolt />Buy Now</button>
                            </div>
                        </div>
                        <div className="right-side">
                            <h1>Lorem ipsum do ipsam nostrum repudiandae, nemo cum saepe deleniti est! Nemo!</h1>
                            <p>
                                <span className='one'>4.3 <AiFillStar /></span>
                                <span className='two'>1231 Ratings & 121 Reviews</span>
                                <span className='three'>EyeWings gives you the sight to see wings</span>
                            </p>
                            <p className="prices">
                                <h1>₹{product?.price}</h1>
                                {product?.regularPrice && <>
                                    <h2>₹ {product?.regularPrice}</h2>
                                    <span>{-Math.floor((product?.price * 100) / product?.regularPrice) + 100}% off</span>
                                </>}
                            </p>
                            <p className='colors'>
                                <h1>Colors : </h1>
                                {
                                    filteredProducts && filteredProducts.map((item, index) => (
                                        <span style={{ backgroundColor: `${item.color}` }} key={index} onClick={() => handleChangeProductFromColor(item)} ></span>
                                    ))
                                }
                                {
                                    filteredProducts.length === 0 &&
                                    <span className='no-item'>Not Available</span>
                                }
                            </p>
                            <span className='gender'>( {product.gender} )</span>
                            <p className="Description">
                                <h2>Description</h2>
                                <p>
                                    {product.description}
                                </p>
                            </p>
                            <section className='specifications'>
                                <h2 className="heading">
                                    Specifactions
                                </h2>

                                <h4>General</h4>
                                <section>
                                    <div className="properties">
                                        <p>Prescription :</p>
                                        <p>Availabilty :</p>
                                        <p>Frame Materail :</p>
                                        <p>Brand :</p>
                                        <p>Model :</p>
                                        <p>Color :</p>
                                        <p>lensmaterial :</p>
                                        <p>lenscolor :</p>
                                        <p>Quantity :</p>
                                    </div>
                                    <div className="value">
                                        <p>{product.prescriptionRequires === false ? "Not Required" : "Required"}</p>
                                        <p>{product.availabilty === false ? "Not Available" : "Available"}</p>
                                        <p>{product.frameMaterial}</p>
                                        <p>{product.brand}</p>
                                        <p>{product.model}</p>
                                        <p>{product.color}</p>
                                        <p>{product.lensMaterial}</p>
                                        <p>{product.lensColor}</p>
                                        <p>{product.quantity}</p>
                                    </div>
                                </section>
                            </section>
                            <section className="rating-review">
                                <h2 className='heading'>
                                    Add Ratings and Reviews
                                </h2>
                                <div className="add-rating">
                                    <Rating
                                        onClick={handleRating}
                                        ratingValue={rating}
                                        size={20}
                                        label
                                        transition
                                        fillColor='orange'
                                        emptyColor='gray'
                                        className='foo' // Will remove the inline style if applied
                                    />
                                    <textarea name="" id="myTextarea" cols="50" rows="15" placeholder='Write Review here.. ' required value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                                    <p>
                                        <label htmlFor="reviewImage">
                                            <BiImageAdd size={21} /> Add Images
                                        </label>
                                        <input type="file" multiple id='reviewImage' style={{ display: "none" }} onChange={(e) => handleImageChange(e)} />
                                        {
                                            reviewImage?.map((image, index) => (

                                                <div className="reviewImages">
                                                    <img src={URL.createObjectURL(image)} alt="" key={index} />
                                                    <ImCross onClick={() => handleImageDelete(index)} />
                                                </div>

                                            ))
                                        }
                                    </p>
                                    {showSubmitBtn && rating > 0 && <button onClick={submitReview}>Submit</button>}
                                </div>
                            </section>
                        </div>
                    </div>
                    <RelatedProducts allproducts={allProducts} />
                    <AllProducts allproducts={allProducts} />

                    <div className="product-reviews">
                        <p style={{ margin: "0", padding: "0" }}>Product Reviews</p>
                        <hr style={{ color: 'grey', height: "1px", backgroundColor: "black", width: "100%" }} />
                        <section>
                            {product.ratings.length === 0 && <h1>No reviews yet</h1>}

                            <div className="right-section">
                                {
                                    product.ratings.length > 0 &&
                                    product.ratings.map((obj, index) => (
                                        <div className="user-review">
                                            <p>
                                                <span style={{ marginRight: "10px" }}>{obj.star} <AiFillStar /></span>
                                                {obj.star === 5 && "Fabulous"}
                                                {obj.star === 4 && "Excellent"}
                                                {obj.star === 3 && "Good"}
                                                {obj.star === 2 && "Bad"}
                                                {obj.star === 1 && "Very Bad"}
                                            </p>
                                            <p id='review'>
                                                {obj.review}
                                            </p>
                                            <p id='reviewImages'>
                                                {
                                                    obj.reviewImages?.map((image, index) => (
                                                        <img src={image} alt="" key={index} />
                                                    ))
                                                }
                                            </p>
                                            <p className="reviewDetails">
                                                {obj.name}     <MdVerified />Certified Buyer , <span style={{ letterSpacing: "initial", backgroundColor: "transparent", color: "grey" }}>{obj.reviewDate}</span>
                                            </p>

                                            {user && user.user?._id === obj.userId && (
                                                <AiFillDelete
                                                    className='review-delete'
                                                    onClick={() => handleReviewDelete(obj.userId)}
                                                />
                                            )}
                                        </div>
                                    ))
                                }
                            </div>

                        </section>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductPage  