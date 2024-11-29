import Profile from "../models/profileSchema.js";
import User from "../models/userSchema.js";



export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}




export const profileCreation = async (req, res) => {
    try {
        const {
            iqamaNumber,
            membershipNumber,
            fullName,
            centralCommittee,
            areaCommittee,
            district,
            expiryDate,
            userStatus,
        } = req.body;

        const existingProfile = await Profile.findOne({
            $or: [{ iqamaNumber }, { membershipNumber }],
        });

        if (existingProfile) {
            return res.status(400).json({
                error: "A profile with this Iqama Number or Membership Number already exists.",
            });
        }

        const newProfile = new Profile({
            iqamaNumber,
            membershipNumber,
            fullName,
            centralCommittee,
            areaCommittee,
            district,
            expiryDate,
            userStatus
        });

        await newProfile.save();

        res.status(201).json({
            message: "Profile created successfully!",
            profile: newProfile,
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
        const profiles = await Profile.find();
        res.status(200).json({
            message: 'User profile retrieved successfully',
            data: profiles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
}



