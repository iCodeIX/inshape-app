import React, { useEffect, useState } from 'react'
import closeIcon from '../../assets/close.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaymentMethods } from '../../features/payment/paymentSlice';

const OrdersSummary = () => {

    const cartItems = useSelector((state) => state.cart.items);
    const payments = useSelector((state) => state.payment.items) || [];
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [selectedMethod, setSelectedMethod] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);


    useEffect(() => {
        if (token) {
            dispatch(fetchPaymentMethods());
        }
    }, [token, dispatch])


    const handleProceed = () => {
        setShowModal(true);
    }
    const handleCancel = () => {
        setShowModal(false);
    };

    const handlePaymentDone = () => {
        // Add logic to verify or move to next step
        setShowModal(false);
        setShowConfirmationModal(true);
        // navigate("/view-orders");
    };

    const closeConfirmation = () => {
        setShowConfirmationModal(false);
        navigate("/view-orders");
    };


    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productId.productPrice * item.quantity,
        0
    );


    return (
        <div className='bg-white flex flex-col h-full w-full top-0 z-50 sm:p-12 sm:flex-row absolute'>

            <div onClick={() => navigate("/all-products")} className='absolute right-0 top-0 w-8 m-4 cursor-pointer'>
                <img src={closeIcon}></img>
            </div>
            <div className="bg-gray-200 sm:w-1/2 mb-4 mx-6 rounded-lg shadow text-sm font-mono p-4">
                <p className="text-center text-red-500 font-bold text-base mb-4">ORDER SUMMARY</p>

                <ul className="divide-y divide-dashed divide-gray-300 mb-4">
                    {cartItems.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-gray-700">{item.productId.productName}</p>
                                <p className="text-xs text-gray-500">
                                    ₱{item.productId.productPrice} x {item.quantity}
                                </p>
                            </div>
                            <div className="text-right text-gray-800 font-semibold min-w-[60px]">
                                ₱{item.productId.productPrice * item.quantity}
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
                    <div className='text-center'>NO PAYMENT METHOD?<p onClick={() => navigate("/setup-payments")} className=' text-center font-semibold underline text-green-500 cursor-pointer'>ADD PAYMENT METHOD </p></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">

                    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                    {/* Dropdown menu */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Choose Payment Method
                        </label>
                        <select
                            onChange={(e) => {
                                const method = payments.find((p) => p._id === e.target.value);
                                setSelectedMethod(method || null);
                            }}
                            defaultValue=""
                            className="w-full p-2 border rounded"
                        >
                            <option value="" disabled>
                                -- Choose Payment Method --
                            </option>
                            {payments.map((method) => (
                                <option key={method._id} value={method._id}>
                                    {method.paymentMethod} - {method.payerNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Show details */}
                    {selectedMethod && (
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>First Name:</strong> {selectedMethod.firstName}</p>
                            <p><strong>Middle Initial:</strong> {selectedMethod.middleInitial}</p>
                            <p><strong>Last Name:</strong> {selectedMethod.lastName}</p>
                            <p><strong>Email:</strong> {selectedMethod.email}</p>
                            <p><strong>Payment Method:</strong> {selectedMethod.paymentMethod}</p>
                            <p><strong>Payer Number:</strong> {selectedMethod.payerNumber}</p>
                        </div>
                    )}
                    <div className="p-6">
                        <button
                            onClick={handleProceed}
                            className="bg-green-600 w-full text-white px-4 py-2 rounded hover:bg-blue-500"
                        >
                            Proceed to Pay
                        </button>
                        {/* main modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                                    <h2 className="text-xl font-bold mb-4">Shop Payment Details</h2>

                                    <div className="mb-4">
                                        <p className="font-semibold">GCash:</p>
                                        <ul className="ml-4 list-disc">
                                            <li>0917-123-4567 (Shop A)</li>
                                            <li>0917-890-1234 (Shop B)</li>
                                        </ul>

                                        <p className="font-semibold mt-4">PayMaya:</p>
                                        <ul className="ml-4 list-disc">
                                            <li>0922-456-7890 (Shop A)</li>
                                            <li>0922-111-2222 (Shop B)</li>
                                        </ul>
                                    </div>

                                    <div className="text-sm text-red-600 mb-4">
                                        ⚠️ Please complete your payment before clicking "Payment Done".
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handlePaymentDone}
                                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500"
                                        >
                                            Payment Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Confirmation Modal */}
                        {showConfirmationModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                                    <h3 className="text-lg font-semibold mb-3 text-center">Payment marked as done!</h3>
                                    <p className="text-sm text-gray-700 mb-4 text-center">
                                        Check <strong>PLACED</strong> items. Once the item is shipped, you can't cancel the order!
                                    </p>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={closeConfirmation}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>



            </div>

        </div>
    )
}

export default OrdersSummary
