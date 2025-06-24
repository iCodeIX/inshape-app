import express from "express";
import { fetchProducts, addProduct, topProductsList } from "../Controllers/productController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/fetch-products", fetchProducts);
router.post("/topProductsList", topProductsList);


export default router;