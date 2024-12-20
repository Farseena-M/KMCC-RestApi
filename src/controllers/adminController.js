import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import { generateTokenAdmin } from "../utils/generateToken.js";


export const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const Exist = await Admin.findOne({ email })
        if (Exist) {
            return res.status(409).json({
                error: 'User already exists'
            })
        }
        const newUser = new Admin({
            name,
            email,
            password,
            role: 'admin'
        })
        await newUser.save()
        return res.status(201).json({
            status: 'Register Success',
            data: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        })
    }
}





export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.comparePasswordInDb(password, admin.password))) {
            return res.status(404).json({ message: 'Incorrect email or password' })
        }
        const token = generateTokenAdmin(admin._id);
        return res.status(200).json({
            message: 'Login Success',
            token,
            data: admin._id,
            role: 'admin'
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        })
    }
}





export const getAllAdmins = async (req, res) => {
    try {
        const loggedAdminId = req.user._id;

        const admins = await Admin.find({ _id: { $ne: loggedAdminId } });

        return res.status(200).json({
            message: 'Fetch admins successfully',
            data: admins
        });
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        });
    }
};






export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        await Admin.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Admin deleted Successfully',
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        })
    }
}





export const profileCreation = async (req, res) => {
    try {

        const { iqamaNumber, AdharNumber } = req.body;

        const existingUser = await User.findOne({
            $or: [{ iqamaNumber }, { AdharNumber }]
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this IQAMA or ADHAR number already exists.",
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



export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            message: "Profile updated successfully!",
            profile: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to update profile.",
        });
    }
};




export const deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found. Unable to delete profile.",
            });
        }

        res.status(200).json({
            message: "Profile deleted successfully!",
        });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({
            error: "An error occurred while deleting the profile. Please try again later.",
        });
    }
};








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




export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await User.findById(id);

        if (!profile) {
            return res.status(404).json({
                message: "User profile not found.",
            });
        }

        res.status(200).json({
            message: "User profile retrieved successfully.",
            data: profile,
        });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        res.status(500).json({
            message: "Error retrieving user profile.",
            error,
        });
    }
};




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




export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                error: "Please provide a search query (name or iqama number).",
            });
        }

        const isNumber = !isNaN(query);

        const users = await User.find(
            isNumber
                ? { iqamaNumber: query }
                : { Name: { $regex: query, $options: "i" } }
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found with the provided query.",
            });
        }

        res.status(200).json({
            message: "Users retrieved successfully.",
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to search users.",
        });
    }
};



//DASHBOARD SECTION




export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            totalUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve total users.",
        });
    }
}


export const getExpiredProfilesCount = async (req, res) => {
    try {
        const currentDate = new Date();

        const expiredProfilesCount = await User.countDocuments({
            expiryDate: { $lt: currentDate },
        });

        res.status(200).json({
            message: "Expired profiles count retrieved successfully.",
            expiredProfilesCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve expired profiles count.",
        });
    }
};



export const getRemainingUsersCount = async (req, res) => {
    try {
        const currentDate = new Date();

        const totalUsers = await User.countDocuments();

        const expiredProfilesCount = await User.countDocuments({
            expiryDate: { $lt: currentDate },
        });

        const remainingUsersCount = totalUsers - expiredProfilesCount;

        res.status(200).json({
            message: "Remaining users count retrieved successfully.",
            remainingUsersCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve remaining users count.",
        });
    }
};









