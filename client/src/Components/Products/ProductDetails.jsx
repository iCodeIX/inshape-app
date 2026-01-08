// ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/product/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            {console.log(product)}
            <img src={product.productImage} alt={product.name} />
            <h1>{product.productName}</h1>
            <p>{product.productDesc}</p>
            <strong>₱{product.productPrice}</strong>
        </div>
    );
};

export default ProductDetails;
