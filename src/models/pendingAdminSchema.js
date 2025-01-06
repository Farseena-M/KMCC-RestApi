import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const pendingAdminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: [true, 'Email is required'], lowercase: true },
    phone: { type: Number },
    photo: { type: String },
    password: { type: String, required: [true, 'Password is required'] },
    role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });

pendingAdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const PendingAdmin = mongoose.model('PendingAdmin', pendingAdminSchema);
export default PendingAdmin;
