import React, { useEffect, useState } from 'react'
// import './Cart.css';
// import { fetchCart, removeFromCart } from '../utils/cartUtils.jsx';
import closeIcon from '../../assets/close.png';
import OrdersSummary from '../Users/OrdersSummary.jsx';
import Login from "../Users/Login.jsx";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeItem, updateQuantity } from '../../features/cart/cartSlice.js';

const DisplayCart = ({ updateQuantity, handleRemoveItem }) => {
    const cartItems = useSelector((state) => state.cart.items) || [];

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
                <ul className="space-y-1 overflow-y-scroll h-70 lg:h-90">
                    {cartItems.map((item) => (

                        <li
                            key={item._id}
                            className="flex items-center justify-between p-4 bg-black-50 rounded-lg shadow-sm"
                        >
                            <div className="flex gap-4 w-full">
                                <img
                                    src={item.productId.productImage}
                                    alt={item.productId.productName}
                                    className="w-20 h-14 rounded-md shrink-0"
                                />

                                <div>
                                    <p className="text-xs font-light uppercase">{item.productId.productName}</p>
                                    <div className='mt-4'>
                                        <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className='border border-gray-300 h-7 w-7 mx-1 cursor-pointer'>-</button>
                                        <input className="w-8 text-gray-500 text-sm" value={item.quantity} readOnly type='number'></input>
                                        <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className='border border-gray-300 h-7 w-7 mx-1 cursor-pointer'>+</button>
                                    </div>
                                </div>
                                <div className='grow bg-red- text-end'>
                                    <p className='text-semibold grow'>
                                        ₱{item.productId.productPrice}
                                    </p>
                                    <button onClick={() => handleRemoveItem(item.productId._id)} className='underline text-sm cursor-pointer mt-4'>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            )}

            <div className='my-6 text-center'>Subtotal: ₱{subtotal}.00 </div>
            <div className='absolute bottom-12 left-0 w-full p-4'>
                <button onClick={() => {
                    handleCloseCart()
                    navigate('./orders-summary')
                }} className='bg-sky-600 w-full h-10 text-white cursor-pointer hover:bg-sky-700'>Check out</button>
            </div>
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
    // const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

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
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    🛒 <span>Your Cart</span>
                </h1>

                {token ? <DisplayCart updateQuantity={handleQuantityChange} handleRemoveItem={handleRemoveItem} /> : <NoProfile handleCloseCart={handleCloseCart} />}
            </div>
        </div>

    );
}
export default Cart
