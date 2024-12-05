import express from 'express';
// import UploadImage from '../middlewares/uploadImage.js';
import { getUserProfileByIqamaNumber, userLogin } from '../controllers/userController.js';
import { Protect, restrict } from '../middlewares/verifyToken.js';
const userRouter = express.Router()

// userRouter.post('/signup', UploadImage, userSignUp)
userRouter.post('/login', userLogin)
userRouter.get('/profile/:iqamaNumber', Protect, restrict(['user']), getUserProfileByIqamaNumber)


export default userRouter;
