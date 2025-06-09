import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    middleInitial: { type: String },
    lastName: { type: String, required: true },
    email: { type: String },
    payerNumber: { type: String },
    paymentMethod: { type: String, enum: ['GCash', 'PayMaya'], required: true },
}
)

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;