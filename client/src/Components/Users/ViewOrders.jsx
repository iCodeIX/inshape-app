import React, { useState } from 'react';

const sampleProducts = {
    shipping: {
        id: 1,
        name: 'Wireless Headphones',
        status: 'Shipping',
        price: '$99.99',
    },
    cancelled: {
        id: 2,
        name: 'Smartwatch Series 5',
        status: 'Cancelled',
        price: '$199.99',
    },
    placed: {
        id: 3,
        name: 'Bluetooth Speaker',
        status: 'Placed',
        price: '$49.99',
    },
};

const ViewOrders = () => {
    const [activeTab, setActiveTab] = useState('placed');

    const handleCancelOrder = (productId) => {
        console.log(`Order ${productId} cancelled.`);
        alert('Order has been cancelled!');
    };

    const renderProduct = (product) => (
        <div className="p-4 border rounded-lg shadow bg-white space-y-2">
            <h4 className="font-semibold text-lg">{product.name}</h4>
            <p className="text-gray-600">Status: {product.status}</p>
            <p className="text-gray-800 font-bold">{product.price}</p>

            {product.status === 'Placed' && (
                <button
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                    onClick={() => handleCancelOrder(product.id)}
                >
                    Cancel Order
                </button>
            )}
        </div>
    );

    const getTabClass = (tab) => {
        const base = 'px-4 py-2 rounded transition';
        if (activeTab === tab) {
            if (tab === 'shipping') return `${base} bg-blue-600 text-white`;
            if (tab === 'cancelled') return `${base} bg-red-600 text-white`;
            if (tab === 'placed') return `${base} bg-green-600 text-white`;
        }
        return `${base} bg-gray-200 text-gray-700 hover:bg-gray-300`;
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

            <div className="flex gap-4 mb-6">
                <button className={getTabClass('placed')} onClick={() => setActiveTab('placed')}>
                    Placed
                </button>
                <button className={getTabClass('shipping')} onClick={() => setActiveTab('shipping')}>
                    Shipping
                </button>
                <button className={getTabClass('cancelled')} onClick={() => setActiveTab('cancelled')}>
                    Cancelled
                </button>

            </div>

            <div>
                {activeTab === 'shipping' && renderProduct(sampleProducts.shipping)}
                {activeTab === 'cancelled' && renderProduct(sampleProducts.cancelled)}
                {activeTab === 'placed' && renderProduct(sampleProducts.placed)}
            </div>
        </div>
    );
};

export default ViewOrders;
