import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            try {
                req.user = await User.findById(decoded.id).select('-password');
            }
            catch (err) {
                return res.status(500).json({ message: 'Server error while finding user' });
            }
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
};
