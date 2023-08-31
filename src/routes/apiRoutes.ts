import express from 'express';
import { getAllTaskLogs } from '../controllers/taskLogController';
import { getAllCommitMessages } from '../controllers/commitMessageController';
import { login,register,logout } from '../controllers/authController';
import { checkSessionValidity } from '../controllers/sessionController';


const router = express.Router();


router.get('/tasks', getAllTaskLogs);
router.get('/commits', getAllCommitMessages);
router.post('/auth/login',login);
router.post('/auth/register',register);
router.get('/auth/check-session', checkSessionValidity);
router.get('/auth/logout',logout);
// Add more routes as needed

export default router;
