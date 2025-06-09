import express from "express";
import { addPaymentMethod, fetchPaymentMethods, deletePaymentMethod, updatePaymentMethod } from "../Controllers/paymentController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.post("/add-payment-method", authMiddleware, addPaymentMethod);
router.get("/fetch-payment-methods", authMiddleware, fetchPaymentMethods);
router.delete("/delete-payment-method/:id", authMiddleware, deletePaymentMethod);
router.put("/update-payment-method/:id", authMiddleware, updatePaymentMethod);

export default router;