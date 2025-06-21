import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        orderItems: [
            {
                productId: {
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

        shippingAddress: {
            address: { type: String, required: true },
            region: { type: String, required: true },
            province: { type: String, required: true },
            municipal: { type: String, required: true },
            barangay: { type: String, required: true },
            postalCode: { type: String, required: true }
        },

        paymentResult: {
            method: { type: String, required: true },
            payerName: { type: String, required: true },
            email: { type: String, required: true },
            payerNumber: { type: String, required: true }

        },

        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },

        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },

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
