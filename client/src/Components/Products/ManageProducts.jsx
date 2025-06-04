import React, { useEffect } from 'react'
// import './ManageProducts.css'
import { useState } from 'react';
import axios from "axios";
import ProductsTable from './ProductsTable.jsx';
import AddProductModal from './AddProductModal.jsx';
import API from '../utils/axios.jsx';

const ManageProducts = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);
    const [products, setProducts] = useState([]);

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

    return (
        <div className='p-8'>
            <h1 className='font-semibold text-lg'>Manage your products here</h1>
            <div className='mb-3'>
                <button onClick={openModal} className='bg-sky-950 text-white py-2 my-3 w-40 cursor-pointer hover:bg-sky-900'>Add Products</button>
                {isModalOpen &&
                    <AddProductModal handleOpen={openModal} handleClose={closeModal} fetchProducts={fetchProducts} />
                }
            </div>
            <p>List of Products</p>
            <ProductsTable products={products} />
        </div >
    )
}

export default ManageProducts
