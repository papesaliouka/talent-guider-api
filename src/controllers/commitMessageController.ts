import { Request, Response } from 'express';
import { connectToDatabase } from '../db'; // Import the function

export const getAllCommitMessages = async (req: Request, res: Response) => {
  try {
    const dbConnection = await connectToDatabase('test-bot');
    const commitMessagesCollection = dbConnection.collection('commits'); // Specify the collection name

    const commitMessages = await commitMessagesCollection.find();
    const data = await commitMessages.toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add more controller functions as needed
