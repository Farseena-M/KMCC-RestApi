import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';


const Protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
    }
};

export default Protect;
