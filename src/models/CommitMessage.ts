import mongoose, { Document, Schema } from 'mongoose';

export interface ICommitMessage extends Document {
  gitUsername: string;
  title: string;
  description: string;
  repo: string;
  branch: string;
}

const commitMessageSchema = new Schema<ICommitMessage>({
  gitUsername: String,
  title: String,
  description: String,
  repo: String,
  branch: String,
});

const CommitMessage = mongoose.model<ICommitMessage>('CommitMessage', commitMessageSchema);

export default CommitMessage;
