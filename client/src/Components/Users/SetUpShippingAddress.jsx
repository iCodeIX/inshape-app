import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress, fetchShippingAddress, updateShippingAddress, deleteShippingAddress } from '../../features/shippingAddress/shippingAddressSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const SetUpShippingAddress = () => {
    const shippingAddress = useSelector((state) => state.shippingAddress.items) || [];
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchShippingAddress());
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
            addressLine1: method.addressLine1,
            addressLine2: method.addressLine2,
            postalCode: method.postalCode,
        });
    };


    const handleNewShippingAddress = () => {
        setFormData({
            addressLine1: '',
            addressLine2: '',
            postalCode: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                await dispatch(updateShippingAddress({ id: formData._id, data: formData })).unwrap();
            } else {
                await dispatch(addShippingAddress(formData)).unwrap();
            }
            await dispatch(fetchShippingAddress()).unwrap();
            handleNewShippingAddress(); // Reset the form
        } catch (err) {
            toast.error(err || "An error occurred");
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: Saved Payment Methods */}
                <div className="bg-gray-50 p-2 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Saved Shipping Address</h3>
                    {shippingAddress.length === 0 ? (
                        <p className="text-gray-500">No Shipping Address yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {shippingAddress.map((method) => (
                                <li
                                    key={method._id}
                                    className="p-2 border rounded-lg flex gap-4 items-center"
                                >
                                    <div>
                                        <p className="font-medium">{method.addressLine1}</p>
                                        <p className="text-sm text-gray-600">{method.addressLine2}</p>
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
                                                dispatch(deleteShippingAddress(method._id));
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
                        onClick={handleNewShippingAddress}
                    >
                        + Add Shipping Address
                    </button>
                </div>


                {/* RIGHT: Payment Setup Form */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Shipping Address Details</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='flex gap-2 flex-col'>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded text-sm"
                                placeholder="Region, City"
                                required
                            />
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded text-sm"
                                placeholder="HouseNo,StreetName,Barangay,Municipal,Province"
                                required
                            />
                            <input
                                type="number"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded text-sm"
                                placeholder="Postal Code"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
                        >
                            Save Shipping Address Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetUpShippingAddress;
