import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod, fetchPaymentMethods, deletePaymentMethod, updatePaymentMethod } from '../../features/payment/paymentSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const SetUpPaymentMethods = () => {
    const payments = useSelector((state) => state.payment.items) || [];
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        email: '',
        payerNumber: '',
        paymentMethod: 'GCash'
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchPaymentMethods());
        }
    }, [token, dispatch])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = (method) => {
        setFormData({
            _id: method._id, // important for identifying update
            firstName: method.firstName,
            middleInitial: method.middleInitial,
            lastName: method.lastName,
            email: method.email,
            payerNumber: method.payerNumber,
            paymentMethod: method.paymentMethod,
        });
    };


    const handleNewPayment = () => {
        setFormData({
            firstName: '',
            middleInitial: '',
            lastName: '',
            email: '',
            payerNumber: '',
            paymentMethod: 'GCash'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                await dispatch(updatePaymentMethod({ id: formData._id, data: formData })).unwrap();
            } else {
                await dispatch(addPaymentMethod(formData)).unwrap();
            }
            await dispatch(fetchPaymentMethods()).unwrap();
            handleNewPayment(); // Reset the form
        } catch (err) {
            toast.error(err || "An error occurred");
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Payment Methods</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: Saved Payment Methods */}
                <div className="bg-gray-50 p-2 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Saved Payment Methods</h3>
                    {payments.length === 0 ? (
                        <p className="text-gray-500">No saved methods yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {payments.map((method) => (
                                <li
                                    key={method._id}
                                    className="p-2 border rounded-lg flex gap-4 items-center"
                                >
                                    <div>
                                        <p className="font-medium">{method.paymentMethod}</p>
                                        <p className="text-sm text-gray-600">{method.payerNumber}</p>
                                    </div>
                                    <button
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                                        onClick={() => handleEdit(method)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500 transition"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this payment method?")) {
                                                dispatch(deletePaymentMethod(method._id));
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Add New Payment Button */}
                    <button
                        className="mt-4 w-full py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
                        onClick={handleNewPayment}
                    >
                        + Add New Payment
                    </button>
                </div>


                {/* RIGHT: Payment Setup Form */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Middle Initial</label>
                                <input
                                    type="text"
                                    name="middleInitial"
                                    value={formData.middleInitial}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded"
                            >
                                <option value="GCash">GCash</option>
                                <option value="PayMaya">PayMaya</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Cellphone Number (for payment)
                            </label>
                            <input
                                type="tel"
                                name="payerNumber"
                                value={formData.payerNumber}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
                        >
                            Save Payment Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetUpPaymentMethods;
