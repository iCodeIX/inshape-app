import React, { useEffect, useState } from 'react';
import closeIcon from '../../assets/close.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../../features/cart/cartSlice.js';

const DisplayCart = ({ updateQuantity, handleCloseCart, handleRemoveItem }) => {
    const cartItems = useSelector((state) => state.cart.items) || [];
    const navigate = useNavigate();
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productId.productPrice * item.quantity,
        0
    );
    return (
        <>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <p className="text-lg">Your cart looks empty!</p>
                </div>
            ) : (
                <div className="w-full max-h-[80vh] bg-white rounded-lg shadow-lg flex flex-col">

                    {/* Scrollable items */}
                    <div className="flex-1 overflow-y-auto px-4 space-y-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between p-2 bg-white rounded shadow">
                                <img src={item.productId.productImage} className="w-16 h-16 object-cover rounded" alt={item.productId.productName} />
                                <div className="flex-1 ml-3">
                                    <p className="text-sm font-medium">{item.productId.productName}</p>
                                    <div className="flex items-center mt-1">
                                        <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className="cursor-pointer w-8 h-8 border border-gray-300 text-gray-700 rounded hover:bg-gray-100">-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="cursor-pointer w-8 h-8 border border-gray-300 text-gray-700 rounded hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <p>₱{item.productId.productPrice}</p>
                                    <button onClick={() => handleRemoveItem(item.productId._id)} className="cursor-pointer text-blue-500 text-xs underline mt-1">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t bg-white">
                        <div className="font-semibold mb-2">Subtotal: ₱{subtotal}.00</div>
                        <button
                            onClick={() => {
                                handleCloseCart();
                                navigate('./orders-summary');
                            }}
                            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Check out
                        </button>
                    </div>

                </div>

            )}
        </>



    )
}


const NoProfile = ({ handleCloseCart }) => {
    const navigate = useNavigate();
    return (
        <div className='container flex justify-center items-center p-8'>
            <div className='text-center'>
                <h3>It appears that you dont have an account.</h3>
                <p>Try to</p>
                <button className="bg-green-500 py-1 px-2 text-white rounded-sm cursor-pointer hover:bg-green-400" onClick={() => {
                    navigate('/register');
                    handleCloseCart();
                }}>Register</button>
                <p>or</p>
                <button className="bg-blue-500 py-1 px-2 text-white rounded-sm cursor-pointer hover:bg-blue-400" onClick={() => {
                    navigate('/login');
                    handleCloseCart();
                }}>Login</button>
            </div >
        </div>

    )
}

const Cart = ({ handleOpenCart, handleCloseCart }) => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();


    const handleQuantityChange = (productId, quantity) => {
        if (quantity >= 1) {
            dispatch(updateQuantity({ productId, quantity }));
        }
    }

    const handleRemoveItem = (productId) => {
        dispatch(removeItem({ productId }));
    }

    return (
        <div className="absolute top-0 right-0 h-[100vh] w-full md:max-w-lg bg-white shadow-lg z-50">
            <div onClick={handleCloseCart} className='absolute top-4 right-4 cursor-pointer'><img className='w-8 m-2' src={closeIcon}></img></div>
            <div className="py-4">
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 px-2">
                    🛒 <span>Your Cart</span>
                </h1>

                {token ? <DisplayCart handleCloseCart={handleCloseCart} updateQuantity={handleQuantityChange} handleRemoveItem={handleRemoveItem} /> : <NoProfile handleCloseCart={handleCloseCart} />}
            </div>
        </div>

    );
}
export default Cart
