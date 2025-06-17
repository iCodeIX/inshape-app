import express from "express";
import { addShippingAddress, fetchShippingAddress, deleteShippingAddress, updateShippingAddress } from "../Controllers/addressControllers.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.post("/add-shipping-address", authMiddleware, addShippingAddress);
router.get("/fetch-shipping-address", authMiddleware, fetchShippingAddress);
router.delete("/delete-shipping-address/:id", authMiddleware, deleteShippingAddress);
router.put("/update-shipping-address/:id", authMiddleware, updateShippingAddress);

export default router;