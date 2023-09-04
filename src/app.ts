import express from 'express';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';



import dotenv from 'dotenv';
dotenv.config();


const app = express();

const origin = process.env.ORIGIN 


// Middleware
app.use(express.json());
app.use(cors({
    origin: origin,
    credentials: true 
}));
app.use(morgan('common'));
app.use(cookieParser());
// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);


export default app;

