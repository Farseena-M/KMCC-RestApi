import express from 'express';
import UploadImage from '../middlewares/uploadImage.js';
import { getUserProfileById, SignUp } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.post('/signup', UploadImage, SignUp)
userRouter.get('/profile/:id', getUserProfileById)

export default userRouter;
