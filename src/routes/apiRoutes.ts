import express from 'express';
import { getAllTaskLogs } from '../controllers/taskLogController';
import { getAllCommitMessages } from '../controllers/commitMessageController';

const router = express.Router();

router.get('/taskLogs', getAllTaskLogs);
router.get('/commitMessages', getAllCommitMessages);
// Add more routes as needed

export default router;
