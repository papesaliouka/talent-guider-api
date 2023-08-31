import { Request, Response } from 'express';
import { UserRepository } from '../repositories/authRepository';
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
    const { email, password } = req.body;
    
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const userToSend ={
        username: user.username,
        email: user.email,
        id: user._id,
    };
    
    req.sessionID = user._id;
    

    const sessionData = {
        id: user._id,
        maxAge: 24 * 60 * 60 * 1000,
        originalMaxAge: 24 * 60 * 60 * 1000,
    }
    
    req.session.cookie= sessionData;
    req.session.save();

    res.cookie("sid",req.sessionID.toString(),
               { maxAge: 24 * 60 * 60 * 1000,
               }
    );  
    res.status(200).json({ message: 'User logged in successfully',user:userToSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', });
  }
};


export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.clearCookie('sid');
        res.status(200).json({ message: 'User logged out successfully' });
    });
};


