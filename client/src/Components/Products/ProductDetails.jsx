// ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0); // Scroll to top when page loads
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <strong>₱{product.price}</strong>
        </div>
    );
};

export default ProductDetails;
