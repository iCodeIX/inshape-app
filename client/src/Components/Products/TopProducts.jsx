import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import usePagination from '../utils/usePagination';
import API from '../utils/axios';

const TopProducts = () => {
    const [topProducts, setTopProducts] = useState([]);
    const dispatch = useDispatch();

    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
    } = usePagination(topProducts, 12);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.post('/product/topProductsList');
            setTopProducts(res.data);
        } catch (error) {
            console.error('Error fetching top products:', error);
        }
    };

    const handleAddToCart = (productId, quantity = 1) => {
        dispatch(addToCart({ productId, quantity }));
    };

    return (
        <section className="py-12 px-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
                    🔥 Top Selling Products
                </h2>
                <p className="text-center text-gray-600 mb-10">
                    These items are flying off the shelves!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {paginatedData.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
                        >
                            <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                Sold: {product.rating}
                            </span>

                            <img
                                src={product.productImage || '/placeholder.jpg'}
                                alt={product.productName}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                    {product.productName}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2 truncate">
                                    {product.productDesc || 'Top rated item'}
                                </p>
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-red-600 font-bold text-lg">
                                    ₱{product.productPrice}
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-sm font-medium"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopProducts;
