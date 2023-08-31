import { connectToDatabase } from '../db'; // Import the function

export const CommitMessageRepository = {
  async getAllCommitMessages() {
    try {
      const dbConnection = await connectToDatabase('test-bot');
      const commitMessagesCollection = dbConnection.collection('commits');

      const commitMessages = await commitMessagesCollection.find().toArray();
      return commitMessages;
    } catch (error) {
      throw error;
    }
  },
};

