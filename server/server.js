import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import connection from './Config/connection.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const allowedOrigins = [
    'http://localhost:5173',
    'https://inshape-app.onrender.com'
];
const app = express();
// Needed to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/api/payment', paymentRoutes);

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
