import { configureStore,combineReducers } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import loginSlice from '../features/login/loginSlice';
import { serviceApi } from '../services';
import { loadState } from './browser-storage';
export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    counter: counterReducer,
    login:loginSlice,
    carts:cartSlice
  },
  // here we restore the previously persisted state
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serviceApi.middleware),
    
});

//export const RootState = store.getState
export const RootState = store.getState
setupListeners(store.dispatch)
