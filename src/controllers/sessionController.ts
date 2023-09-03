import { Request, Response } from 'express';
import { SessionRepository } from '../repositories/sessionRepository';

export const checkSessionValidity = async (req: Request, res: Response) => {
  try {
    const sessionID = req.cookies.sid
    if (sessionID) {
       const data = await SessionRepository.findByUserID(sessionID);
       if(!data){
           return res.status(401).json({ valid: false, user: null });
       }
    
       return res.status(200).json({ valid: true,
                                   user: {
                                       id: data.id,
                                       username: data.username,
                                       email: data.email,
                                   }
       });
    }else{
        return res.status(401).json({ valid: false, user: null });
    } 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

