import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import paymentReducer from '../features/payment/paymentSlice';
import shippingAddressReducer from '../features/shippingAddress/shippingAddressSlice';
import orderReducer from '../features/order/orderSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        payment: paymentReducer,
        shippingAddress: shippingAddressReducer,
        order: orderReducer
    },
});

export default store;
