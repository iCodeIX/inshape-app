import Cart from '../Models/Cart.js';
import Order from '../Models/Order.js';
import ShippingAddress from '../Models/ShippingAddress.js';
import Payment from '../Models/Payment.js';
import Product from '../Models/Product.js';
import User from '../Models/User.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { shippingAddressId, paymentId } = req.body;

        // 1. Get Cart
        const cart = await Cart.findOne({ userId: userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // 2. Get Shipping Address
        const shippingAddress = await ShippingAddress.findOne({
            _id: shippingAddressId,
            userId: userId
        });

        if (!shippingAddress) {
            return res.status(404).json({ message: 'Shipping address not found' });
        }

        // 3. Get Payment Info
        const payment = await Payment.findOne({
            _id: paymentId,
            userId: userId
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // 4. Build Order Items Snapshot
        const orderItems = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const itemsPrice = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.productId.productPrice,
            0
        );

        const shippingPrice = 50;
        const totalPrice = itemsPrice + shippingPrice;

        // 5. Create Order (match your Order schema exactly)
        const newOrder = new Order({
            userId: userId,
            orderItems,
            shippingAddress: {
                address: shippingAddress.addressLine,
                region: shippingAddress.region,
                province: shippingAddress.province,
                municipal: shippingAddress.municipal,
                barangay: shippingAddress.barangay,
                postalCode: shippingAddress.postalCode
            },
            paymentResult: {
                method: payment.paymentMethod,
                payerName: `${payment.firstName} ${payment.middleInitial || ''} ${payment.lastName}`.trim(),
                email: payment.email || '',
                payerNumber: payment.payerNumber
            },
            itemsPrice,
            shippingPrice,
            totalPrice,
            isPaid: payment.status === 'Paid',
            paidAt: payment.paidAt || null,
            // Optional: let the default handle status as "placed"
            // status: 'placed'
        });

        await newOrder.save();

        await Cart.deleteOne({ userId: userId });

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
    try {
        const userId = req.user._id;

        const orders = await Order.find({ userId })
            .populate({
                path: 'orderItems.productId',
                model: Product,
                select: 'productName productPrice productImage'
            })
            .populate({
                path: 'userId',
                model: User,
                select: 'name email'
            })
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            userId: order.userId,
            orderItems: order.orderItems.map(item => ({
                ...item,
                productId: item.productId,
                quantity: item.quantity
            }))
        }));

        // ✅ wrap in object so res.data.orders is valid
        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};


export const cancelOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const orderId = req.params.id;

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = "cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled", order });
    } catch (err) {
        console.error("Cancel order error:", err);
        res.status(500).json({ message: "Server error cancelling order" });
    }
};
