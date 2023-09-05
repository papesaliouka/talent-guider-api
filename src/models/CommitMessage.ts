import mongoose, { Document, Schema } from 'mongoose';

export interface ICommitMessage extends Document {
  gitUsername: string;
  title: string;
  description: string;
  repo: string;
  branch: string;
  date: Date;
}

const commitMessageSchema = new Schema<ICommitMessage>({
  gitUsername: String,
  title: String,
  description: String,
  repo: String,
  branch: String,
  date: Date,
});

const CommitMessage = mongoose.model<ICommitMessage>('commits', commitMessageSchema);

export default CommitMessage;
