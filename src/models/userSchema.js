import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    iqamaNumber: { type: Number, required: true, unique: true },
    MembershipNumber: { type: Number, unique: true },
    CentralCommittee: { type: String, required: true },
    SaudiMob: { type: Number, required: true, match: /^[0-9]{10,15}$/ },
    HouseName: { type: String, required: true },
    Panchayath: { type: String, required: true },
    RoadPlace: { type: String, required: true },
    PostOffice: { type: String, required: true },
    PinCode: { type: Number, match: /^[0-9]{6}$/ },
    District: { type: String, required: true },
    IndiaMob: { type: Number, required: true, match: /^[0-9]{10}$/ },
    Assembly: { type: String, required: true },
    Parliament: { type: String, required: true },
    AdharNumber: { type: Number, match: /^[0-9]{12}$/, unique: true },
    HimayaStatus: { type: String, required: true, enum: ['Active', 'Inactive', 'Pending'] },
    PaymentStatus: {
        type: String,
        enum: ['Pending', 'Received', 'Completed'],
        required: true
    },
    ApprovalStatus: { type: String, required: true, enum: ['Approved', 'Rejected', 'Pending'] },
    Nominee: { type: String, required: true },
    CreatedBy: { type: String, required: true },
    AreaCoordinator: { type: String, required: true },
    AreaCoordinatorApprovedComment: { type: String, default: '' },
    CreatedByDate: { type: Date, required: true },
    ApprovedCentalCommitteeUser: { type: String, required: true, default: '' },
    CentralcommitteeApprovedComment: { type: String, default: '' },
    CentralcommitteeApprovedDate: { type: Date, required: true, default: Date.now },
    Payment: { type: Number, required: true, min: 0 },
    expiryDate: {
        type: Date,
        required: true
    },
    photo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
});


const User = mongoose.model("User", userSchema);
export default User;