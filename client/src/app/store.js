import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import paymentReducer from '../features/payment/paymentSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        payment: paymentReducer
    },
});

export default store;
