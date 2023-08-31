import express from 'express';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();


const app = express();

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';


// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(cookieParser());
// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);


export default app;

