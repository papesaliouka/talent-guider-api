import { Request, Response } from 'express';
import { UserRepository } from '../repositories/authRepository';
import { SessionRepository } from '../repositories/sessionRepository';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    const { email, password,username } = req.body;
    try{
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingUsername = await UserRepository.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

    }catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.createUser(email,username, hashedPassword);
    if (!newUser) {
        return res.status(500).json({ message: 'Internal Server Error' });     
    }
    
     res.status(201).json({ message: 'User registered successfully' });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    // Check if the identifier is an email or username
    const isEmail = identifier.includes('@');
    let user;

    if (isEmail) {
      // If it's an email, find the user by email
      user = await UserRepository.findByEmail(identifier);
    } else {
      // If it's not an email, find the user by username
      user = await UserRepository.findByUsername(identifier);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userToSend = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const sessionValue = {
      ...userToSend,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    const session = await SessionRepository.createSession(sessionValue);
    if (!session) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.cookie('sid', user._id, { maxAge: 24 * 60 * 60 * 1000,sameSite: 'none', secure: true,path: '/',domain:'talent-guider-api-production.up.railway.app' });
    res.status(200).json({ message: 'User logged in successfully', user: userToSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const logout = async (req: Request, res: Response) => {
    
    const sessionID = req.cookies.sid;

    if (!sessionID) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const session = await SessionRepository.findByUserID(sessionID);
    if (!session) {
        return res.status(402).json({ message: 'User not logged in' });
    }

    const deleted = await SessionRepository.deleteByUserID(sessionID);
    if (!deleted) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }


    res.clearCookie('sid');
    res.status(200).json({ message: 'User logged out successfully' });
};


