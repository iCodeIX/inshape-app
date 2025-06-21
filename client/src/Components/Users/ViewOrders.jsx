import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/order/orderSlice';
import moment from 'moment';

const ViewOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.items);
  const [activeTab, setActiveTab] = useState('placed');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getTabClass = (tab) => {
    const base = 'px-4 py-2 rounded transition';
    if (activeTab === tab) {
      const colors = {
        placed: 'bg-green-600',
        shipping: 'bg-blue-600',
        cancelled: 'bg-red-600',
        delivered: 'bg-black'
      };
      return `${base} ${colors[tab]} text-white`;
    }
    return `${base} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  const filteredOrders = orders?.filter((order) => order.status === activeTab) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {['placed', 'shipping', 'cancelled', 'delivered'].map((tab) => (
          <button key={tab} className={getTabClass(tab)} onClick={() => setActiveTab(tab)}>
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
                  const product = item.productId; // 🔁 use `productId`, not `product`
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
