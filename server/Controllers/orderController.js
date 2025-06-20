import Cart from '../Models/Cart.js';
import Order from '../Models/Order.js';
import ShippingAddress from '../Models/ShippingAddress.js';
import Payment from '../Models/Payment.js';
import Product from '../Models/Product.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { shippingAddressId, paymentId, paymentMethod } = req.body;

        // 1. Get Cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // 2. Get Shipping Address
        const shippingAddress = await ShippingAddress.findOne({
            _id: shippingAddressId,
            user: userId
        });

        if (!shippingAddress) {
            return res.status(404).json({ message: 'Shipping address not found' });
        }

        // 3. Get Payment Info
        const payment = await Payment.findOne({
            _id: paymentId,
            user: userId
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // 4. Build Order Items Snapshot
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const itemsPrice = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        );
        const shippingPrice = 50; // You can make this dynamic
        const totalPrice = itemsPrice + shippingPrice;

        // 5. Create Order
        const newOrder = new Order({
            user: userId,
            orderItems,
            shippingAddress: {
                fullName: shippingAddress.fullName,
                address: shippingAddress.address,
                city: shippingAddress.city,
                postalCode: shippingAddress.postalCode,
                country: shippingAddress.country,
                phone: shippingAddress.phone
            },
            paymentResult: {
                method: payment.method,
                transactionId: payment.transactionId,
                status: payment.status,
                paidAt: payment.paidAt
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            isPaid: payment.status === 'Paid',
            paidAt: payment.paidAt || null,
            status: 'shipping'
        });

        await newOrder.save();

        // 6. Clear Cart (optional)
        await Cart.deleteOne({ user: userId });

        return res.status(201).json({
            message: 'Order placed successfully',
            orderId: newOrder._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error placing order' });
    }
};


export const fetchOrders = async (req, res) => {

}

export const cancelOrders = async (req, res) => {

}
