import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import connection from './Config/connection.js';
import dotenv from 'dotenv';
dotenv.config();
const allowedOrigins = ['http://localhost:5173'];
const app = express();
app.use(cors({
    origin: allowedOrigins,
    credentials: true // optional if you're using cookies or sessions
}));
app.use(express.json());

// Connect MongoDB
connection();

// routes
app.get('/', (req, res) => {
    res.send('Hello from backend programmers!');
});

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
