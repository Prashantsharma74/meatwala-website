import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categorylist, getDiningRestaurants, getOfferRestaurants, getRestaurants, getTopRestaurants } from "../../utils/api";
// import productService from "./ProductService";

const initialState = {
    isError : false,
    isSuccess : false,
    isLoading : false,
    restaurant : [],
    diningRestaurant : [],
    restraDetail : [],
    topRestaurant : [],
    offeredRestaurant : [],
    categorylist : {},
}

const restaurantSlice = createSlice({
    name : "Restaurants" , 
    initialState,
    reducers: {

    },
    extraReducers:  (builder)=> {
        builder
        .addCase(getRestaurant.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getRestaurant.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.restaurant = action.payload.restdata
            // state.restaurant = action.payload.toprestaurant
        })
        .addCase(getRestaurant.rejected , (state)=>{
            state.isLoading = false
            state.isError = true
        })
        .addCase(getDining.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getDining.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.diningRestaurant = action.payload
        })
        .addCase(getDining.rejected , (state)=>{
            state.isLoading = false
            state.isError = true
        })
        .addCase(getTopRest.fulfilled , (state , action)=>{
            state.topRestaurant = action.payload
        })
        .addCase(getOfferRest.fulfilled , (state , action)=>{
            state.offeredRestaurant = action.payload
        })
        .addCase(getCategorylist.fulfilled , (state , action)=>{
            state.categorylist = action.payload
        })

    }

})

export const getRestaurant = createAsyncThunk('create/get', async (data, thunkAPI) => {
    try {
        return  await getRestaurants(data)
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})
export const getDining = createAsyncThunk('get/dining', async (data, thunkAPI) => {
    try {
        return  await getDiningRestaurants(data)
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})
export const getTopRest = createAsyncThunk('get/top', async (data, thunkAPI) => {
    try {
        return  await getTopRestaurants(data)
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})
export const getOfferRest = createAsyncThunk('get/offer', async ( data, thunkAPI) => {
    try {
        return  await getOfferRestaurants(data)
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})
export const getCategorylist = createAsyncThunk('create/categorylist', async (data, thunkAPI) => {
    try {
        return  await categorylist(data)
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})


export default restaurantSlice.reducer