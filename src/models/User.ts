import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  avatar: string;
}

export const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  email: String,
  avatar: String,
});

const User = mongoose.model<IUser>('users', userSchema);

export default User;

