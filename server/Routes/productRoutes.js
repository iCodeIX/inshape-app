import express from "express";
import { fetchProducts, addProduct, getTopProducts } from "../Controllers/productController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/fetch-products", fetchProducts);
router.get("/get-top-products", getTopProducts);


export default router;