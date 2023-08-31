import mongoose, { Document, Schema } from 'mongoose';

export interface ITaskLog extends Document {
  userID: string;
  username: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  subjectName: string;
}

export const taskLogSchema = new Schema<ITaskLog>({
  userID: String,
  username: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  subjectName: String,
});

const TaskLog = mongoose.model<ITaskLog>('test-bot-logs', taskLogSchema);

export default TaskLog;
