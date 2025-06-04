import express from "express";
import { viewProductsList, addProduct, topProductsList } from "../Controllers/productController.js";


const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/productsList", viewProductsList);
router.post("/topProductsList", topProductsList);


export default router;