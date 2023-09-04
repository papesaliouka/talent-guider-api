import { Request, Response } from 'express';
import { TaskLogRepository } from '../repositories/logsRepository';
import { SessionRepository } from '../repositories/sessionRepository';

export const getAllTaskLogs = async (req: Request, res: Response) => {
  try {
    const sessionID = req.cookies.sid;
    if (!sessionID) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const taskLogs = await TaskLogRepository.getAllTaskLogs();
    res.json(taskLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getTaskLogByUserID = async (req: Request, res: Response) => {
    try {
        const sessionID = req.cookies.sid;
        if (!sessionID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await SessionRepository.findByUserID(sessionID);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        const endDate = new Date();
    
        const taskLogs = await TaskLogRepository.getTaskLogByUsername(user.username,startDate.toISOString(), endDate.toISOString());
        res.json(taskLogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

