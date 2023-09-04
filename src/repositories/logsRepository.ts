import TaskLog from '../models/TaskLog';

export const TaskLogRepository = {
    
  async getAllTaskLogs() {
    try {
      return await TaskLog.find();
    } catch (error) {
      throw error;
    }
  },

async getTaskLogByUsername(username: string,startDate:string , endDate: string) {
    let query =
        [
    {
        '$match': {
            'username': username,
            'startTime': {
                '$gte': new Date(startDate),
                '$lte': new Date(endDate)
            }
        }
    }, {
        '$project': {
            'day': {
                '$dayOfWeek': {
                   date: '$startTime',
                   timezone: 'Senegeal/Dakar'
                }
            },
            'week': {
                '$week': '$startTime',
            },
            startTime: 1,
            subjectName: 1,
            duration: {
                '$divide': [
                    {
                        '$subtract': ['$endTime', '$startTime']
                    },
                    60000
                ]
            },
            _id: 0
        }
    },
    {
        '$group': {
            '_id': '$week',
            'subjectNames':{
                '$push': '$subjectName',
            },
            'durations': {
                '$push': '$duration',
            },
            days: {
                '$push': '$day',
            },
            totalOfWeek: {
                '$sum': '$duration',
            },
            date: {
                '$push': '$startTime',
            },
        }
    },
    ];
    try {

      return await TaskLog.aggregate(query)
    } catch (error) {
      throw error;
    }
  },

};

