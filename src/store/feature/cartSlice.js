import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItems } from "../../utils/api";

const initialState = {
    isError : false,
    isSuccess : false,
    isLoading : false,
    cartItems : [],
    count: 0, 
    
}

const cartSlice = createSlice({
    name : "Cart" , 
    initialState,
    reducers: {
        incrementCount(state) {
            state.count += 1;  
        },
        updateFoodQuantity(state, action) {
            const { foodId, newQuantity } = action.payload;
            const foodItem = state.cartItems.find(item => item.foodid === foodId);
            if (foodItem) {
                foodItem.quantity = newQuantity;
            }
        },
        clearCart(state) {
            state.cartItems = []; // Clear all items from the cart
        },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(getcart.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getcart.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cartItems = action.payload
        })
        .addCase(getcart.rejected , (state)=>{
            state.isLoading = false
            state.isError = true
        })
    }

})


export const getcart = createAsyncThunk('get/cart', async ( thunkAPI) => {
    try {
        return  await CartItems()
    } catch (error) {
        const massage = error.response.data.message
        return thunkAPI.rejectWithValue(massage)
    }
})

export const { incrementCount } = cartSlice.actions;
export default cartSlice.reducer