import express from 'express';
import { adminLogin, adminSignup, approveAdmin, deleteAdmin, deleteProfile, getAdminProfile, getAllAdmins, getExpiredProfiles, getExpiredProfilesCount, getPendingAdmins, getProfileById, getProfiles, getRemainingUsersCount, getTotalUsers, profileCreation, rejectAdmin, searchUsers, updateAdminProfile, updateProfile } from '../controllers/adminController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';
import UploadImage from '../middlewares/uploadImage.js';

const adminRouter = express.Router()

adminRouter.post('/signup', adminSignup)
adminRouter.post('/login', adminLogin)
adminRouter.get('/pending-requests', Protect, restrict(['admin']), getPendingAdmins)
adminRouter.post('/approve/:pendingAdminId', Protect, restrict(['admin']), approveAdmin);
adminRouter.delete('/reject/:pendingAdminId', Protect, restrict(['admin']), rejectAdmin);
adminRouter.post('/user-profile', Protect, restrict(['admin']), UploadImage, profileCreation)
adminRouter.get('/user-profile', Protect, restrict(['admin']), getProfiles)
adminRouter.get('/profiles/sorted', Protect, restrict(['admin']), getExpiredProfiles)
adminRouter.get('/search-users', Protect, restrict(['admin']), searchUsers)
adminRouter.patch('/user/:id', Protect, restrict(['admin']), updateProfile)
adminRouter.delete('/user/:id', Protect, restrict(['admin']), deleteProfile)
adminRouter.get('/user/:id', Protect, restrict(['admin']), getProfileById)
adminRouter.get('/users', Protect, restrict(['admin']), getTotalUsers)
adminRouter.get('/expired/users', Protect, restrict(['admin']), getExpiredProfilesCount)
adminRouter.get('/remainingusers', Protect, restrict(['admin']), getRemainingUsersCount)
adminRouter.get('/all-admins', Protect, restrict(['admin']), getAllAdmins)
adminRouter.delete('/:id', Protect, restrict(['admin']), deleteAdmin)
adminRouter.get('/:id', Protect, restrict(['admin']), getAdminProfile)
adminRouter.patch('/profile/:id', Protect, restrict(['admin']), UploadImage, updateAdminProfile)


export default adminRouter;