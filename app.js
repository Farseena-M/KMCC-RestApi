import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


export default app