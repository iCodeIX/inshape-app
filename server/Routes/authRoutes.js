import express from 'express';
import { createAccount, loginUser, getProfile, signupGoogle } from '../Controllers/userController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';


const router = express.Router();

// POST /api/users
router.post('/register', createAccount);

router.post('/login', loginUser); // POST /api/auth/login
// Protected Route
router.get('/profile', authMiddleware, getProfile);
router.post('/googlesignup', signupGoogle);



export default router;
