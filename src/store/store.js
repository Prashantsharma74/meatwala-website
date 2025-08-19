import { configureStore } from '@reduxjs/toolkit';
import RestaurantReducer from './feature/restaurantSlice';
import CartReducer from './feature/cartSlice';
import UserReducer from './feature/userSlice';
import pincodeReducer from './feature/pincodeSlice'

export const store = configureStore({
  reducer: {
    restaurant: RestaurantReducer,
    Cart: CartReducer,
    User: UserReducer,
    pincode: pincodeReducer,
  },
});
