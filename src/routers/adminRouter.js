import express from 'express';
import { getProfiles, getUsers, profileCreation } from '../controllers/adminController.js';

const adminRouter = express.Router()

adminRouter.post('/user-profile', profileCreation)
adminRouter.get('/user-profile', getProfiles)
adminRouter.get('/all-users', getUsers)


export default adminRouter;