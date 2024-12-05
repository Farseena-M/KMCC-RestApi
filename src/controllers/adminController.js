import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken';


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email, role: 'admin' }, process.env.ADMIN_JWT_SECRET, {
            expiresIn: process.env.LOGIN_EXPIRES
        });
        return res.status(200).json({
            message: 'Login success',
            role: 'admin',
            token
        });
    } else {
        return res.status(404).json({
            status: 'Not found',
            message: 'Invalid admin credentials'
        });
    }
}




export const profileCreation = async (req, res) => {
    try {

        const iqamaNumber = req.body.iqamaNumber
        const existingUser = await User.findOne({ iqamaNumber });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this Iqama Number already exists.",
            });
        }
        const user = await User.create(req.body)
        res.status(201).json({
            message: "Profile created successfully!",
            profile: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create profile.",
        });
    }
}






export const getProfiles = async (req, res) => {
    try {
        const profiles = await User.find();
        res.status(200).json({
            message: 'User profile retrieved successfully',
            data: profiles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
}



export const getExpiredProfiles = async (req, res) => {
    try {
        const { order = "asc" } = req.query;
        const currentDate = new Date();

        const profiles = await User.find({
            expiryDate: { $lt: currentDate },
        }).sort({ expiryDate: order === "asc" ? 1 : -1 });

        res.status(200).json({
            message: "Expired profiles sorted by expiry date retrieved successfully.",
            profiles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve expired profiles.",
        });
    }
};





