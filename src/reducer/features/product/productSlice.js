import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from 'react-toastify';

const initialState = {
    isSuccess: "",
    isError: "",
    isLoading: "",
    product: null,
    message: "",
    allProducts: null,
    dashboardAllOrders:null,
    filters: {
        selectedPrice: "all",
        selectedColor: "all",
        selectedShape: "all",
        gender: "unisex",
        categories: "all",
    },
}

// create Product 
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get all products
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete product 
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (ProductId, thunkAPI) => {
        try {
            return await productService.deleteProduct(ProductId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data, thunkAPI) => {
        try {
            return await productService.updateProduct(data)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get a product 
export const getAproduct = createAsyncThunk(
    "product/getAproduct",
    async (userData, thunkAPI) => {
        try {
            return await productService.getAproduct(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// review a product
export const reviewAproduct = createAsyncThunk(
    "product/reviewAproduct",
    async (reviewData, thunkAPI) => {
        try {
            return await productService.reviewAproduct(reviewData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete a review
export const deleteReview = createAsyncThunk(
    "product/deleteReview",
    async (userData, thunkAPI) => {
        try {
            return await productService.deleteReview(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get all orders on admin dashboard
export const allOrders = createAsyncThunk(
    "product/allOrders",
    async (_, thunkAPI) => {
        try {
            return await productService.allOrders()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update orderStatus from userOrder and dashboardOrder
export const updateOrderStatus = createAsyncThunk(
    "product/updateOrderStatus" , 
    async(userData , thunkAPI)=>{
        try {
            return await productService.updateOrderStatus(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        RESET_PRODUCT(state) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.product = null;
            state.message = ""
        },
        resetFilterProduct:(state)=>{
            state.filters.selectedColor = "all";
            state.filters.selectedShape = "all";
            state.filters.gender = "unisex";
            state.filters.categories = "all";
            state.filters.selectedPrice = "all";
        },
        setSelectedPrice: (state, action) => {
            state.filters.selectedPrice = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.filters.selectedColor = action.payload;
        },
        setSelectedShape: (state, action) => {
            state.filters.selectedShape = action.payload;
        },
        setGender: (state, action) => {
            state.filters.gender = action.payload;
        },
        setCategories: (state, action) => {
            state.filters.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // create product
            .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                toast.success("Product created successfully")
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.product = null;
                toast.error(action.payload)
            })
            // get all product 
            .addCase(getAllProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.allProducts = null;
                toast.error(action.payload)
            })
            // delete product
            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                toast.error(action.payload)
            })
            // update product
            .addCase(updateProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload
                toast.success("Updated successfully")
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.product = null;
                toast.error(action.payload)
            })
            // get a product
            .addCase(getAproduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload
            })
            .addCase(getAproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.product = null;
                toast.error(action.payload)
            })
            // review a product
            .addCase(reviewAproduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(reviewAproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload
                toast.success("Review Added")
            })
            .addCase(reviewAproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.product = null;
                toast.error(action.payload)
            })
            // delete a review
            .addCase(deleteReview.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload
                toast.success("Review Deleted")
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.product = null
                toast.error(action.payload)
            })
            // dashboard all products
            .addCase(allOrders.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.dashboardAllOrders = action.payload
            })
            .addCase(allOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dashboardAllOrders = null
                toast.error(action.payload)
            })
            // update order Status
            .addCase(updateOrderStatus.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success("Updated")
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                toast.error(action.payload)
            })
    }
});



export const { RESET_PRODUCT,
    setSelectedPrice,
    setSelectedColor,
    setSelectedShape,
    setGender,
    setCategories, resetFilterProduct } = productSlice.actions

export default productSlice.reducer