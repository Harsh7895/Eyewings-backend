import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
    user: null,
    message: "",
    data:null
}

// register user
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// login user
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// logout user
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await authService.logout()
        } catch (error) {
            const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get login status
export const loginStatus = createAsyncThunk(
    "auth/loginStatus",
    async (_, thunkAPI) => {
        try {
            return await authService.loginStatus()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get user
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        try {
            return await authService.getUser()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update user 
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update photo
export const updatePhoto = createAsyncThunk(
    "auth/updatePhoto",
    async (userData, thunkAPI) => {
        try {
            return await authService.updatePhoto(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update Cart items quantity
export const updateCartItemsQuantity = createAsyncThunk(
    "auth/updateCartItemsQuantity",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateCartItemsQuantity(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete a cart item
export const deleteItemFromCart = createAsyncThunk(
    "auth/deleteItemFromCart",
    async (userData, thunkAPI) => {
        try {
            return await authService.deleteItemFromCart(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// delete a wishlist item
export const updateWishList = createAsyncThunk(
    "auth/updateWishList",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateWishList(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// const product checkout
export const productCheckout =  createAsyncThunk(
    "auth/productCheckout",
    async (userData, thunkAPI) => {
        try {
            return await authService.productCheckout(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// const update and save updateOrderAddress
export const updateOrderAddress = createAsyncThunk(
    "auth/updateOrderAddress",
    async(userData , thunkAPI) => {
        try {
            return await authService.updateOrderAddress(userData)
        } catch (error) {
            const message = (error.response && error.response.message && error.response.message.data) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET_AUTH(state) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            //register user
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload
                toast.success("Registered successfully")
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = true;
                state.isLoggedIn = false;
                state.user = null;
                toast.error(action.payload)
            })
            //login usre
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.user = action.payload
                toast.success("Logged in successfully")
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isLoggedIn = false;
                state.user = null
                toast.error(action.payload)
            })
            //logout user
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.user = null;
                toast.success("Logout succcessfully")
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = true;
                toast.error(action.payload)
            })
            // login status
            .addCase(loginStatus.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
                if (action.payload.message === "Invalid signature") {
                    state.isLoggedIn = false;
                }
            })
            .addCase(loginStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            // get user
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isLoggedIn = false;
                toast.error(action.payload)
            })
            // update user
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
            // update photo
            .addCase(updatePhoto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("Profile pic uploaded")


            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
            // update cart items quantity 
            .addCase(updateCartItemsQuantity.pending, (state) => {
                // state.isLoading = true;
            })
            .addCase(updateCartItemsQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(updateCartItemsQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // delete a item from cart
            .addCase(deleteItemFromCart.pending, (state) => {
                // state.isLoading = true;
            })
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // delete a item from wishlist
            .addCase(updateWishList.pending, (state) => {
                // state.isLoading = true;
            })
            .addCase(updateWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(updateWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // product checkout
            .addCase(productCheckout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(productCheckout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.data = action.payload
            })
            .addCase(productCheckout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.data= null;
                toast.error(action.payload);
            })
            // update and save order address
            .addCase(updateOrderAddress.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateOrderAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(updateOrderAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
    }
});

export const { RESET_AUTH } = authSlice.actions

export default authSlice.reducer