import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Name: { type: String },
    iqamaNumber: { type: Number, sparse: true, unique: true },
    MembershipNumber: { type: Number },
    CentralCommittee: { type: String },
    SaudiMob: { type: Number, match: /^[0-9]{10,15}$/ },
    HouseName: { type: String },
    Panchayath: { type: String },
    RoadPlace: { type: String },
    PostOffice: { type: String },
    PinCode: { type: Number, match: /^[0-9]{6}$/ },
    District: { type: String },
    IndiaMob: { type: Number, match: /^[0-9]{10}$/ },
    Assembly: { type: String },
    Parliament: { type: String },
    AdharNumber: { type: Number, match: /^[0-9]{12}$/, sparse: true, unique: true },
    HimayaStatus: { type: String, enum: ['Active', 'Inactive', 'Pending'] },
    PaymentStatus: {
        type: String,
        enum: ['Pending', 'Received', 'Completed'],
    },
    ApprovalStatus: { type: String, enum: ['Approved', 'Rejected', 'Pending'] },
    Nominee: { type: String },
    CreatedBy: { type: String },
    AreaCoordinator: { type: String },
    AreaCoordinatorApprovedComment: { type: String, default: '' },
    CreatedByDate: { type: Date, default: null },
    ApprovedCentalCommitteeUser: { type: String, default: '' },
    CentralcommitteeApprovedComment: { type: String, default: '' },
    CentralcommitteeApprovedDate: { type: Date, default: null },
    Payment: { type: Number, min: 0 },
    expiryDate: {
        type: Date,
        default: null
    },
    photo: { type: String },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
        default: '',
        sparse: true
    },
    password: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
});


const User = mongoose.model("User", userSchema);
export default User;