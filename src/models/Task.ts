import { Document, model, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
}

const taskSchema = new Schema<ITask>({
  title: String,
  description: String,
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
