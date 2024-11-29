import express from 'express';
import UploadImage from '../middlewares/uploadImage.js';
import { getUserProfileById, userLogin, userSignUp } from '../controllers/userController.js';
import Protect from '../middlewares/verifyToken.js';
const userRouter = express.Router()

userRouter.post('/signup', UploadImage, userSignUp)
userRouter.post('/login', userLogin)
userRouter.get('/profile/:id',Protect, getUserProfileById)

export default userRouter;
