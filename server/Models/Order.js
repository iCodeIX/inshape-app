import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],

        // ✅ Embedded shipping snapshot
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String }
        },

        // ✅ Embedded payment snapshot
        paymentResult: {
            method: { type: String, required: true },         // e.g., GCash
            transactionId: { type: String },
            status: { type: String },                         // 'Paid', 'Pending'
            paidAt: { type: Date }
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },

        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },

        status: {
            type: String,
            enum: ['placed', 'shipping', 'cancelled', 'delivered'],
            default: 'placed'
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
