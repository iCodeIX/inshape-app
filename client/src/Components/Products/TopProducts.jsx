import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { getTopProducts } from '../../features/product/productSlice';
import usePagination from '../utils/usePagination';

const TopProducts = () => {
    const dispatch = useDispatch();
    const topProducts = useSelector((state) => state.product.top);         // ✅ Gets array of top products
    const topStatus = useSelector((state) => state.product.status.top);    // ✅ Gets status of top products loading


    useEffect(() => {
        if (topStatus === 'idle') {
            dispatch(getTopProducts());
        }
    }, [dispatch, topStatus]);

    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
    } = usePagination(topProducts, 12);

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

                {topStatus === 'loading' ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading top products...</span>
                    </div>
                ) : topStatus === "succeeded" && topProducts.length > 0 ? (
                    <>
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
                                            onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id) }}
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
                    </>
                ) : topStatus === "succeeded" ? (
                    <p className="text-center text-gray-500">No top products available.</p>
                ) : null}
            </div>
        </section>
    );
};

export default TopProducts;
