import express from 'express';
import { adminLogin, getProfiles, getUsers, profileCreation } from '../controllers/adminController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/user-profile', Protect, restrict(['admin']), profileCreation)
adminRouter.get('/user-profile', Protect, restrict(['admin']), getProfiles)
adminRouter.get('/all-users', Protect, restrict(['admin']), getUsers)


export default adminRouter;