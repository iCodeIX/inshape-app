import express from "express";
import { placeOrder, fetchOrders, cancelOrders } from "../Controllers/orderController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get("/fetch-orders", authMiddleware, fetchOrders);
router.post("/cancel-orders", authMiddleware, cancelOrders);

export default router;
