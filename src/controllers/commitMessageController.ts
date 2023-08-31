import { Request, Response } from 'express';
import { CommitMessageRepository } from '../repositories/commitsRepository';

export const getAllCommitMessages = async (req: Request, res: Response) => {
  try {
    const commitMessages = await CommitMessageRepository.getAllCommitMessages();
    res.json(commitMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

