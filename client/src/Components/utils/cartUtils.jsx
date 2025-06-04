// cartUtils.js
import API from "./axios";
import { useState } from "react";


export const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');

    try {
        const res = await API.post(
            '/cart/add',
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Item added to cart:', res.data.cart);
    } catch (err) {
        console.error('Error adding item:', err.response ? err.response.data : err);
    }
};

export const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await API.get('/cart/fetchCart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Cart items:', res.data.items);
        return res.data.items;
    } catch (err) {
        console.error('Error fetching cart:', err.response ? err.response.data : err);
        return [];
    }
};


export const removeFromCart = (id) => {

};

