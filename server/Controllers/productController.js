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


export const viewProductsList = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "error getting products / under routes" })
    }

}


export const topProductsList = async (req, res) => {
    try {
        const topRatedProducts = await Product.find().sort({ rating: -1 });
        res.status(200).json(topRatedProducts);
    } catch (error) {
        res.status(400).json({ message: "error getting products / under routes" })
    }

}