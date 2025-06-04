import React from 'react'
import usePagination from '../utils/usePagination.jsx';


const ProductsTable = ({ products }) => {
    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        goToPage
    } = usePagination(products, 10); // 5 items per page
    return (

        <div className='table-container'>

            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className='bg-blue-950 text-white'>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Product Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Price (₱)</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Image</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {paginatedData.map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-200">
                            <td className="py-2 px-4 border">{index + 1 + (currentPage - 1) * 5}</td>
                            <td className="py-2 px-4 border">{product.productName}</td>
                            <td className="py-2 px-4 border">{product.productDesc}</td>
                            <td className="py-2 px-4 border">{product.productPrice}</td>
                            <td className="py-2 px-4 border">{product.productCategory}</td>
                            <td className="py-2 px-4 border"><img className='h-20 mx-auto' src={product.productImage} alt={product.productName} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        </div>

    );
};

export default ProductsTable
