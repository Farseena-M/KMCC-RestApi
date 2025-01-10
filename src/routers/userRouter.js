import express from 'express';
import {  getImages, userLogin } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.get('/upload/images', getImages);


export default userRouter;
