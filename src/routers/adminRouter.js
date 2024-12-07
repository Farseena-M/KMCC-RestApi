import express from 'express';
import { adminLogin, deleteProfile, getExpiredProfiles, getProfileById, getProfiles, profileCreation, searchUsers, updateProfile } from '../controllers/adminController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';
import UploadImage from '../middlewares/uploadImage.js';

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/user-profile', Protect, restrict(['admin']), UploadImage, profileCreation)
adminRouter.get('/user-profile', Protect, restrict(['admin']), getProfiles)
adminRouter.get('/profiles/sorted', Protect, restrict(['admin']), getExpiredProfiles)
adminRouter.get('/search-users', Protect, restrict(['admin']), searchUsers)
adminRouter.patch('/user/:id', Protect, restrict(['admin']), updateProfile)
adminRouter.delete('/user/:id', Protect, restrict(['admin']), deleteProfile)
adminRouter.get('/user/:id', Protect, restrict(['admin']), getProfileById)


export default adminRouter;