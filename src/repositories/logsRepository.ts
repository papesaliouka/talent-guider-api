import TaskLog from '../models/TaskLog';

export const TaskLogRepository = {
  async getAllTaskLogs() {
    try {
      return await TaskLog.find();
    } catch (error) {
      throw error;
    }
  },
};

