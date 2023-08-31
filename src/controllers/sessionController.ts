import { Request, Response } from 'express';

export const checkSessionValidity = async (req: Request, res: Response) => {
  try {
    if (req.sessionID) {
      // User is authenticated
      res.status(200).json({ valid: true });
    } else {
      // User is not authenticated
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

