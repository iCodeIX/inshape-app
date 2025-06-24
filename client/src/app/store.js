import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import paymentReducer from '../features/payment/paymentSlice';
import shippingAddressReducer from '../features/shippingAddress/shippingAddressSlice';
import orderReducer from '../features/order/orderSlice';
import productReducer from '../features/product/productSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        payment: paymentReducer,
        shippingAddress: shippingAddressReducer,
        order: orderReducer
    },
});

export default store;
