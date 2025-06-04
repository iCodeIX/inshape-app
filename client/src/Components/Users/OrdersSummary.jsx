import React, { useEffect, useState } from 'react'
import { fetchCart } from '../utils/cartUtils';
import closeIcon from '../../assets/close.png';
import { useNavigate } from 'react-router-dom';
const OrdersSummary = () => {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const items = getCart();
        setCartItems(items);
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select an option");

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const options = ["Gcash", "Paymaya"];


    return (
        <div className='bg-white flex flex-col h-full w-full top-0 z-50 sm:p-12 sm:flex-row absolute'>

            <div onClick={() => navigate("/AllProducts")} className='absolute right-0 top-0 w-8 m-4 cursor-pointer'>
                <img src={closeIcon}></img>
            </div>
            <div className="bg-gray-100 sm:w-1/2 mb-4 mx-6 rounded-lg shadow text-sm font-mono p-4">
                <p className="text-center text-red-500 font-bold text-base mb-4">ORDER SUMMARY</p>

                <ul className="divide-y divide-dashed divide-gray-300 mb-4">
                    {cartItems.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-gray-700">{item.productName}</p>
                                <p className="text-xs text-gray-500">
                                    ₱{item.productPrice} x {item.quantity}
                                </p>
                            </div>
                            <div className="text-right text-gray-800 font-semibold min-w-[60px]">
                                ₱{item.productPrice * item.quantity}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-dashed border-gray-400 pt-3">
                    <div className="flex justify-between mb-1">
                        <div className="flex-col sm:flex justify-between mb-1 ">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">₱{subtotal}</span>
                        </div>
                        <div className="flex-col sm:flex justify-between mb-1 ">
                            <span className="text-gray-600">Shipping Fee:</span>
                            <span className="font-medium">₱50</span>
                        </div>
                        <div className="flex justify-between text-base font-bold border-t border-gray-400 pt-2">
                            <span>Grand Total:</span>
                            <span>₱{subtotal + 50}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="sm:w-1/2 px-4 bg-white rounded-lg shadow-md mx-auto space-y-4 font-sans text-sm">
                <div className='bg-gray-200 p-2'>
                    <p className='text-center'> To use Vouchers/Discounts and Save Payment Details<div onClick={() => navigate("/Register")} className=' text-center font-semibold underline text-green-500 cursor-pointer'>CREATE AN ACCOUNT</div></p>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payer Info</h2>
                <p className="text-gray-600 mb-2">Fill in with the correct information.</p>

                <div className="space-y-3 flex flex-col py-2">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="sm:w-full border border-gray-300 rounded-md sm:px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <input
                        type="text"
                        placeholder="Middle Initial"
                        className="sm:w-full border border-gray-300 rounded-md sm:px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="sm:w-full border border-gray-300 rounded-md sm:px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="sm:w-full border border-gray-300 rounded-md sm:px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>

                <div>
                    <p className="mt-4 text-gray-700 font-medium">Payment Method</p>
                    <div className="relative mt-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full text-left bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                            {selected}
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <p className="text-gray-700 font-medium mt-4">Use the one that will send the payment:</p>
                    <input
                        type="number"
                        placeholder="CP number"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>

                <button className="cursor-pointer w-full my-4 bg-sky-600 text-white font-semibold py-2 rounded-md hover:bg-sky-700 transition">
                    PROCEED
                </button>
            </div>

        </div>
    )
}

export default OrdersSummary
