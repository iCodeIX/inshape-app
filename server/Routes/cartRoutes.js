import express from 'express';
import { add, fetchCart, updateQuantity, removeItem } from '../Controllers/cartController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, add);
router.get('/fetchCart', authMiddleware, fetchCart);
router.post('/update-quantity', authMiddleware, updateQuantity)
router.delete('/remove-item', authMiddleware, removeItem)

export default router;