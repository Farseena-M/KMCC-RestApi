import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './src/routers/userRouter.js';
import adminRouter from './src/routers/adminRouter.js';

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/user', userRouter)
app.use('/admin', adminRouter)


export default app