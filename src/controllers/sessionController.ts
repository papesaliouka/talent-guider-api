import { Request, Response } from 'express';
import { SessionRepository } from '../repositories/sessionRepository';
import {UserRepository} from '../repositories/authRepository';

export const checkSessionValidity = async (req: Request, res: Response) => {
  try {
      const sessionID = req.cookies.sid
      console.log("hitted",sessionID)
    if (sessionID) {
       const data = await SessionRepository.findByUserID(sessionID);
       if(!data){
           return res.status(401).json({ valid: false, user: null });
       }
    
       const user = await UserRepository.findByID(data.id);
    
       if (!user){
           return res.status(402).json({ valid: false, user: null });
       }

       return res.status(200).json({ valid: true,
                                   user: {
                                       id: user._id,
                                       username: user.username,
                                       email: user.email,
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

