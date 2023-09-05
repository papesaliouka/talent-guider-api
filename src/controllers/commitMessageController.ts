import { Request, Response } from 'express';
import { CommitMessageRepository } from '../repositories/commitsRepository';
import { SessionRepository } from '../repositories/sessionRepository';


export const getCommitMessageByUsername = async (req: Request, res: Response) => {
    const id = req.cookies.sid;

    if (!id) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    
    const session = await SessionRepository.findByUserID(id);
    if (!session) {
        return res.status(402).json({ message: 'User not logged in' });
    }

    const { username } = session;

    if (!username) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    
    try {
        const commitMessage = await CommitMessageRepository.getCommitMessageByUsername(username);
        if (!commitMessage) {
        return res.status(404).json({ message: 'Commit Message not found' });
        }
        res.json(commitMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
