import React from 'react'
// import './TopProducts.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import usePagination from '../utils/usePagination.jsx';
import { addToCart } from '../utils/cartUtils.jsx';
import API from '../utils/axios.jsx';

const TopProducts = () => {
    const [topProducts, setTopProducts] = useState([]);
    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        goToPage
    } = usePagination(topProducts, 12); // 5 items per page


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.post("/product/topProductsList");
            setTopProducts(res.data);
        } catch (error) {
            console.log("error fetching".error)
        }

    };


    return (
        <section className="all-products p-8">
            <h2 className='text-center text-2xl font-bold'>Top Selling Products</h2>
            <p className='text-center text-lg p-4'>Products buyers massively buying</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-12 mt-5 justify-start">
                {paginatedData.map((product, index) => (
                    <div className="relative flex flex-col gap-2 bg-white cursor-pointer border border-gray-300 rounded-xl p-4 shadow-md transition-transform duration-300 ease-in-out w-full" key={product._id}>
                        {<span className="absolute -top-2 -left-2 text-sm bg-red-500 p-1 text-white rounded-md"> Sold: {product.rating}</span>}
                        <img className="w-80 h-60" src={product.productImage} alt={product.productName} />
                        <h3 className="text-md font-semibold">{product.productName}</h3>
                        <p className="text-sm ">Price: <label>₱{product.productPrice}</label></p>
                        <button className="w-full my-2 p-2 text-white text-sm bg-red-500 cursor-pointer hover:bg-red-300 mx-auto" onClick={() => addToCart(product._id)}>ADD TO CART</button>
                    </div>
                ))
                }
            </div >


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

        </section >
    )
}

export default TopProducts
