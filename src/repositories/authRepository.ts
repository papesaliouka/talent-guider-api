import User, { IUser } from '../models/User';

export const UserRepository = {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  },

  async findByUsername(username: string): Promise<IUser | null> {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw error;
    }
  },

  async createUser(email: string,username:string , password: string): Promise<IUser> {
    try {
      const newUser = new User({
        username,
        email,
        password,
      });
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  },
};

