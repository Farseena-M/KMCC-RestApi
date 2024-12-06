import express from 'express';
import {  userLogin } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.post('/login', userLogin)


export default userRouter;
