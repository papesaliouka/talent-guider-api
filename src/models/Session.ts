import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
    id: String;
    username: String;
    email: String;
    expires: Date;
}

export const sessionSchema = new Schema<ISession>({
    id: String,
    username: String,
    email: String,
    expires: Date,
});

const User = mongoose.model<ISession>('sessions', sessionSchema);

export default User;

