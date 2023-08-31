import Session from '../models/Session';



export const SessionRepository = {
  async createSession(session:any ): Promise<any> {
    try {
        return await Session.create(session);
    } catch (error) {
        throw error;
    }
  },  
  async findByUserID(id: string): Promise<any | null> {
    try {
      return await Session.findOne({ id: id });
    } catch (error) {
      throw error;
    }
  },
  async deleteByUserID(id: string): Promise<any | null> {
    try {
      return await Session.findOneAndDelete({ id: id });
    } catch (error) {
      throw error;
    }
  },

};

