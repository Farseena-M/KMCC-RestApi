import User from "../models/userSchema.js";
import { generateTokenUser } from "../utils/generateToken.js";



export const userLogin = async (req, res) => {
    try {
        const { iqamaNumber, AdharNumber } = req.body;

        if (!iqamaNumber && !AdharNumber) {
            return res.status(400).json({ error: "Iqama number or Adhar number is required." });
        }

        const user = await User.findOne({
            $or: [{ iqamaNumber }, { AdharNumber }]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const token = generateTokenUser(user._id);

        res.status(200).json({
            message: "Login successful!",
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed. Please try again." });
    }
};

