import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../features/product/productSlice';
import { addToCart } from '../../features/cart/cartSlice';
import usePagination from '../utils/usePagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AllProducts = () => {
    const dispatch = useDispatch();
    const { items: products, status } = useSelector((state) => state.product);

    const query = useQuery();
    const searchTerm = query.get('query') || '';
    const hasSearch = searchTerm.trim() !== '';

    const filteredProducts = hasSearch
        ? products.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : products;

    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
    } = usePagination(filteredProducts, 9);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleAddToCart = (productId, quantity = 1) => {
        dispatch(addToCart({ productId, quantity }));
    };

    return (
        <section className="py-12 px-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
                    {hasSearch ? `Search Results for "${searchTerm}"` : 'All Products'}
                </h2>

                {!hasSearch && (
                    <p className="text-center text-gray-600 mb-10">
                        Choose the best fits for your daily workout!
                    </p>
                )}

                {status === 'loading' ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading products...</span>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {paginatedData.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
                                >
                                    <img
                                        src={product.productImage || "/placeholder.jpg"}
                                        alt={product.productName}
                                        className="w-full h-56 object-cover rounded-md mb-4"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                            {product.productName}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 truncate">
                                            {product.productDesc || "No description"}
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
                        <div className="mt-12 flex justify-center">
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
                ) : (
                    <p className="text-center text-red-500 mt-10">
                        No products {hasSearch ? `found for "${searchTerm}"` : 'available'}.
                    </p>
                )}
            </div>
        </section>
    );
};

export default AllProducts;
