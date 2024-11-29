import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';


export const Protect = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({ message: 'You are not logged in' });
    }
    const token = authToken.split(' ')[1];
    try {
        const decodedAdmin = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        req.user = { _id: decodedAdmin.id, role: 'admin', email: decodedAdmin.email };
        return next();
    } catch (adminError) {
        console.log('Admin token verification failed:', adminError.message);
    }

    try {
        const decodedUser = jwt.verify(token, process.env.USER_JWT_SECRET);

        const user = await User.findById(decodedUser.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = { _id: user._id, role: 'user', email: user.email };
        return next();
    } catch (userError) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export const restrict = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

