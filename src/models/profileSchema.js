import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    iqamaNumber: {
        type: Number,
        required: true,
        unique: true
    },
    membershipNumber: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    centralCommittee: {
        type: String,
        required: true
    },
    areaCommittee: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    userStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, { timestamps: true });


const Profile = mongoose.model("Profile", profileSchema);
export default Profile;