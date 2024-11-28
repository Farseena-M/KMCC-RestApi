import Profile from "../models/profileSchema.js";
import User from "../models/userSchema.js";


export const SignUp = async (req, res) => {
    try {
        const {
            fullName,
            fatherName,
            iqamaNumber,
            email,
            country,
            bloodGroup,
            age,
            gender,
            termsAccepted,
        } = req.body;

        if (!termsAccepted || termsAccepted !== "true") {
            return res.status(400).json({ error: "You must accept the terms." });
        }

        const newUser = new User({
            fullName,
            fatherName,
            iqamaNumber,
            email,
            country,
            bloodGroup,
            photo: req.file ? req.file.path : null,
            age,
            gender,
            termsAccepted: termsAccepted === "true",
        });


        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to register user." });
    }
}



export const getUserProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            data: profile,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
};