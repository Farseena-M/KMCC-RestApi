import express from 'express';
import { adminLogin, getExpiredProfiles, getProfiles, profileCreation, searchUsers } from '../controllers/adminController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';
import UploadImage from '../middlewares/uploadImage.js';

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/user-profile', Protect, restrict(['admin']), UploadImage, profileCreation)
adminRouter.get('/user-profile', Protect, restrict(['admin']), getProfiles)
adminRouter.get('/profiles/sorted', Protect, restrict(['admin']), getExpiredProfiles)
adminRouter.get('/search-users', Protect, restrict(['admin']), searchUsers)


export default adminRouter;