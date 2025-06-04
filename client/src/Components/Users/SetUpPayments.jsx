import React, { useState } from 'react';

const SetUpPayments = () => {
    const [savedMethods, setSavedMethods] = useState([
        {
            id: 1,
            paymentMethod: 'GCash',
            firstName: 'John',
            middleInitials: 'A.',
            lastName: 'Doe',
            email: 'john@example.com',
            cellphone: '09171234567',
        },
        {
            id: 2,
            paymentMethod: 'PayMaya',
            firstName: 'Jane',
            middleInitials: 'B.',
            lastName: 'Smith',
            email: 'jane@example.com',
            cellphone: '09987654321',
        },
    ]);

    const [formData, setFormData] = useState({
        firstName: '',
        middleInitials: '',
        lastName: '',
        email: '',
        paymentMethod: 'GCash',
        cellphone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = (method) => {
        setFormData({
            firstName: method.firstName,
            middleInitials: method.middleInitials,
            lastName: method.lastName,
            email: method.email,
            paymentMethod: method.paymentMethod,
            cellphone: method.cellphone,
        });
    };

    const handleNewPayment = () => {
        setFormData({
            firstName: '',
            middleInitials: '',
            lastName: '',
            email: '',
            paymentMethod: 'GCash',
            cellphone: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saved/Updated Payment Info:', formData);
        alert('Payment details saved!');
        // Add or update logic can go here
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Payment Methods</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: Saved Payment Methods */}
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Saved Payment Methods</h3>
                    {savedMethods.length === 0 ? (
                        <p className="text-gray-500">No saved methods yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {savedMethods.map((method) => (
                                <li
                                    key={method.id}
                                    className="p-4 border rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">{method.paymentMethod}</p>
                                        <p className="text-sm text-gray-600">{method.cellphone}</p>
                                    </div>
                                    <button
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                                        onClick={() => handleEdit(method)}
                                    >
                                        Edit Details
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
                                <label className="block text-sm font-medium text-gray-700">Middle Initials</label>
                                <input
                                    type="text"
                                    name="middleInitials"
                                    value={formData.middleInitials}
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
                                name="cellphone"
                                value={formData.cellphone}
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

export default SetUpPayments;
