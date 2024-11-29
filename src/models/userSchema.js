import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    iqamaNumber: { type: Number },
    email: { type: String, required: true, unique: true },
    country: { type: String, default: "Saudi Arabia" },
    bloodGroup: { type: String },
    photo: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    password: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    termsAccepted: { type: Boolean, required: true },
});


const User = mongoose.model("User", userSchema);
export default User;