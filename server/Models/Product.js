import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },
        productDesc: { type: String, required: true },
        productPrice: { type: Number, required: true },
        productCategory: { type: String, required: true },
        productImage: { type: String },
        createdAt: {
            type: Date,
            default: Date.now, // 👈 this auto-sets when added
        },
        rating: { type: Number, default: 0 }
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
