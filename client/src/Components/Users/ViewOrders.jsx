import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, cancelOrder } from '../../features/order/orderSlice';
import moment from 'moment';

const ViewOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.items);
    const [activeTab, setActiveTab] = useState('placed');

    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // For delivery info

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleCancelOrder = (orderId) => {
        setCancelOrderId(orderId);
    };

    const handleCloseModal = () => {
        setCancelOrderId(null);
    };

    const confirmCancelOrder = async () => {
        await dispatch(cancelOrder(cancelOrderId)).unwrap();
        dispatch(fetchOrders());
        setCancelOrderId(null);
    };

    const handleDeliveryInfo = (order) => {
        setSelectedOrder(order);
        setShowDeliveryModal(true);
    };

    const closeDeliveryModal = () => {
        setShowDeliveryModal(false);
        setSelectedOrder(null);
    };

    const filteredOrders = Array.isArray(orders)
        ? orders.filter((order) => order.status === activeTab)
        : [];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
                {['placed', 'shipping', 'cancelled', 'delivered'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded transition ${activeTab === tab
                                ? {
                                    placed: 'bg-green-600',
                                    shipping: 'bg-blue-600',
                                    cancelled: 'bg-red-600',
                                    delivered: 'bg-black',
                                }[tab] + ' text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <p>No orders found in this category.</p>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="p-4 border rounded-lg bg-white shadow">
                            <h4 className="text-lg font-semibold">Order #{order._id}</h4>
                            <p className="text-sm text-gray-600">Ordered on: {moment(order.createdAt).format('LL')}</p>
                            <p className="text-sm text-gray-600">
                                Status: <span className="font-medium">{order.status}</span>
                            </p>

                            <div className="mt-2 divide-y">
                                {order.orderItems.map((item, index) => {
                                    const product = item.productId;
                                    return (
                                        <div key={index} className="flex gap-4 py-2 items-center">
                                            <img
                                                src={product?.productImage || '/placeholder.jpg'}
                                                alt={product?.productName || 'Product'}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">{product?.productName || 'Unnamed Product'}</p>
                                                <p className="text-sm text-gray-500">
                                                    ₱{product?.productPrice} x {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-bold text-gray-800">
                                                ₱{product?.productPrice * item.quantity}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between mt-4 border-t pt-2 font-semibold">
                                <span>Total:</span>
                                <span>₱{order.totalPrice}</span>
                            </div>

                            <button
                                onClick={() => handleDeliveryInfo(order)}
                                className="w-full font-semibold underline p-2"
                            >
                                Delivery Information
                            </button>

                            {order.status === 'placed' && (
                                <button
                                    onClick={() => handleCancelOrder(order._id)}
                                    className="w-full bg-red-500 text-white p-2 mt-2"
                                >
                                    Cancel Order
                                </button>
                            )}

                            {/* Cancel Order Modal */}
                            {cancelOrderId === order._id && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                                        <h2 className="text-xl font-bold mb-4">Do you really want to cancel this order?</h2>
                                        <div className="text-sm text-red-600 mb-4">
                                            ⚠️ Once cancelled, this cannot be undone!
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={handleCloseModal}
                                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={confirmCancelOrder}
                                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500"
                                            >
                                                Proceed to Cancel Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Delivery Info Modal */}
            {showDeliveryModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                        <div className="text-sm space-y-2">
                            <p><span className="font-semibold">Full Name:</span> {selectedOrder?.paymentResult?.payerName}</p>
                            <p><span className="font-semibold">Phone:</span> {selectedOrder?.paymentResult?.payerNumber}</p>
                            <p><span className="font-semibold">Address:</span> {`${selectedOrder.shippingAddress.address}, ${selectedOrder.shippingAddress.barangay}, ${selectedOrder.shippingAddress.municipal}, ${selectedOrder.shippingAddress.province}, ${selectedOrder.shippingAddress.region}, ${selectedOrder.shippingAddress.postalCode}`}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeDeliveryModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewOrders;
