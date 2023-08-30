import { Request, Response } from 'express';
import TaskLog from '../models/TaskLog'; // Import the Mongoose model

export const getAllTaskLogs = async (req: Request, res: Response) => {
  try {
    const taskLogs = await TaskLog.find(); // Use the Mongoose model to query the collection
    res.json(taskLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add more controller functions as needed
