import React from 'react'
// import './AllProducts.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import usePagination from '../utils/usePagination.jsx';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/axios.jsx';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        goToPage
    } = usePagination(products, 5);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.post("/product/productsList");
            setProducts(res.data);
        } catch (error) {
            console.log("error fetching".error)
        }

    };
    const query = useQuery();
    const searchTerm = query.get('query') || '';

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hasSearch = searchTerm.trim() !== '';

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    
    const handleAddtoCart = async (productId, quantity = 1) => {
        dispatch(addToCart(productId, quantity));
    }

    return (
        <section className="p-8">
            {hasSearch ? (
                <div className="search-results">
                    <h2>Search Results for "{searchTerm}"</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-12 mt-5">
                            {filteredProducts.map((product, index) => (
                                <div className="flex flex-col gap-2 bg-white cursor-pointer border border-gray-300 rounded-xl p-4 shadow-md transition-transform duration-300 ease-in-out w-full" key={product.id}>
                                    <img className="w-80 h-60" src={product.productImage} alt={product.productName} />
                                    <h3 className="text-md font-semibold">{product.productName}</h3>
                                    <p className="text-sm">Price: <label>₱{product.productPrice}</label></p>
                                    <button className="w-full my-2 p-2 text-white text-sm bg-red-500 cursor-pointer hover:bg-red-300 mx-auto" onClick={() => addToCart(product._id)}>ADD TO CART</button>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>No products found for "{searchTerm}"</p>
                    )}
                </div>
            ) : (
                <div className="all-products">
                    <h2 className='text-center text-2xl font-bold'>All Products</h2>
                    {products.length > 0 ? (
                        <>
                            <p className='text-center text-lg p-4'>Choose the best fits for your daily workout!</p>
                            <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12 mt-5">
                                {paginatedData.map((product, index) => (
                                    <div className="flex flex-col gap-2 bg-white cursor-pointer border border-gray-200 rounded-xl p-4 shadow-md transition-transform duration-300 ease-in-out w-full" key={product.id}>
                                        <img className="w-80 h-60" src={product.productImage} alt={product.productName} />
                                        <h3 className="text-md font-semibold">{product.productName}</h3>
                                        <p className="text-sm">Price: <label>₱{product.productPrice}</label></p>
                                        <button className="w-full p-2 text-white text-sm bg-red-500 cursor-pointer hover:bg-red-300 my-2 mx-auto" onClick={() => handleAddtoCart(product._id)}>ADD TO CART</button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex justify-center">
                                <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-md">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className="cursor-pointer p-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-gray-700 font-medium">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className="cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )
            }

        </section >
    )
}

export default AllProducts
