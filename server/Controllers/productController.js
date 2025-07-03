import Product from "../Models/Product.js";

export const addProduct = async (req, res) => {

    const { productName, productDesc, productPrice, productCategory, productImage, createdAt, rating } = req.body;

    try {
        const product = new Product({
            productName, productDesc, productPrice, productCategory, productImage
        });

        await product.save();
        res.status(201).json(product);

    } catch (error) {

        res.status(400).json({ "name": req.body });
    }
}

export const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        // Important: Wrap it with a `products` key so your frontend gets `res.data.products`
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error getting products" });
    }
};



export const getTopProducts = async (req, res) => {
    try {
        const topRatedProducts = await Product.find({ rating: { $gt: 0 } })
            .sort({ rating: -1 });

        res.status(200).json({ topRatedProducts });
    } catch (error) {
        res.status(400).json({ message: "error getting products / under routes" })
    }

}