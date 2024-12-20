import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
}, { timestamps: true })


adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

adminSchema.methods.comparePasswordInDb = async (pswd, pswdDB) => {
    return bcrypt.compare(pswd, pswdDB)
}



const Admin = mongoose.model('Admin', adminSchema)
export default Admin;