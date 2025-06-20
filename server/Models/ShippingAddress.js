import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressLine: { type: String, required: true },      // Building, House No, Street
    region: { type: String, required: true },
    province: { type: String, required: true },
    municipal: { type: String, required: true },
    barangay: { type: String, required: true },
    postalCode: { type: String, required: true },        // use String to allow postal codes like "0700" or alphanumeric
}, {
    timestamps: true
});

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);

export default ShippingAddress;
