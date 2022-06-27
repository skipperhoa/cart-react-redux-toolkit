import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import loginSlice from '../features/login/loginSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login:loginSlice,
    carts:cartSlice
  },
});
