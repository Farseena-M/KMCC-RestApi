import express from 'express';
import { adminLogin, getExpiredProfiles, getProfiles, profileCreation } from '../controllers/adminController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/user-profile', Protect, restrict(['admin']), profileCreation)
adminRouter.get('/user-profile', Protect, restrict(['admin']), getProfiles)
adminRouter.get('/profiles/sorted', Protect, restrict(['admin']), getExpiredProfiles)


export default adminRouter;