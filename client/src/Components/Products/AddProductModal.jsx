import React from 'react'
import { useState } from 'react';
import axios from "axios";
import API from '../utils/axios.jsx';

const equipmentCategories = [
    "Cardio Equipment",
    "Strength Training Equipment",
    "Free Weights",
    "Bodyweight & Functional Training",
    "Benches & Supports",
    "Flexibility & Recovery Tools",
    "Accessories"
];


const AddProductModal = ({ handleOpen, handleClose, fetchProducts }) => {

    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("Cardio Equipment");
    const [productImage, setProductImage] = useState("");
    const [rawImage, setRawImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setRawImage(file);
        if (file) {
            setProductImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setProductCategory(e.target.value);
    };


    if (!handleOpen) return null;


    const addProductHandle = async (e) => {
        e.preventDefault();

        if (!productImage) return alert("Please select an image!");
        
        try {
            
            const formData = new FormData();
            formData.append("file", rawImage);
            formData.append("upload_preset", "products"); // your unsigned preset

            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/df9i6l8cw/image/upload",
                formData
            );
            const imageUrl = uploadRes.data.secure_url; // 🔥 Get uploaded image URL

            const res = await API.post("/product/addProduct", {
                productName,
                productDesc,
                productPrice,
                productCategory,
                productImage: imageUrl
            })

            console.log("Product data ", res.data);
            fetchProducts();
            handleClose();

        } catch (error) {
            console.log("ERROR adding product".error);
        }
    }


    return (

        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
            <div className="modal-content bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="modal-close cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={handleClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">Add Product Details</h2>
                <form onSubmit={addProductHandle} className="space-y-4">
                    <div>
                        <input
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            type="text"
                            placeholder="Product name"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            value={productDesc}
                            onChange={e => setProductDesc(e.target.value)}
                            type="text"
                            placeholder="Description"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            value={productPrice}
                            onChange={e => setProductPrice(e.target.value)}
                            type="number"
                            placeholder="Price"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category-select" className="block mb-1 font-medium">
                            Select Category:
                        </label>
                        <select
                            id="category-select"
                            value={productCategory}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {equipmentCategories.map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="file-upload"
                            className="block mb-1 font-medium cursor-pointer text-blue-600"
                        >
                            Upload Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {productImage && (
                            <div className="mt-2">
                                <img
                                    src={productImage}
                                    alt="Preview"
                                    className="max-w-full max-h-52 rounded-lg border"
                                />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        ADD PRODUCT
                    </button>
                </form>
            </div>
        </div>

    );
};

export default AddProductModal