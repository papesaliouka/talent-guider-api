import { Request, Response } from 'express';
import { TaskLogRepository } from '../repositories/logsRepository';

export const getAllTaskLogs = async (req: Request, res: Response) => {
  try {
    const taskLogs = await TaskLogRepository.getAllTaskLogs();
    res.json(taskLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

