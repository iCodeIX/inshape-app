import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    postalCode: { type: Number, required: true },
}
)

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);

export default ShippingAddress;