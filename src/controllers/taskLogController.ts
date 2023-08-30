import { Request, Response } from 'express';
import { connectToDatabase } from '../db'; // Import the function

export const getAllTaskLogs = async (req: Request, res: Response) => {
  try {
    const dbConnection = await connectToDatabase('test-bot');
    const taskLogsCollection = dbConnection.collection('test-bot-logs'); // Specify the collection name

    const taskLogs = await taskLogsCollection.find();
    const data = await taskLogs.toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add more controller functions as needed
