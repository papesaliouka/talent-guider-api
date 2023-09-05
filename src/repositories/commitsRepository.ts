import CommitMessage from "../models/CommitMessage";

export const CommitMessageRepository = {
  async getCommitMessageByUsername(username: string) {
    try {
    
    const query = [
        {
            $match: {
               gitUsername: username,
               date: {   
                $gte: new Date(new Date().setDate(new Date().getDate()-7)),
                $lte: new Date()
                }
            },
        },{
            $project: {
                _id: 0,
                gitUsername: 1,
                title: 1,
                description: 1,
                repo: 1,
                branch: 1,
                date: 1,
                day: { $dayOfWeek: "$date" },
                week: { $week: "$date" },
            },
        },{
            $group: {
                _id: {
                    week: "$week",
                    day: "$day",
                },
                description: { $push: "$description" },
                title: { $push: "$title" },
                repo: { $push: "$repo" },
                branch: { $push: "$branch" },
                date: { $push: "$date" },
                day: { $push: "$day" },
                total: { $sum: 1 },
            },
        }
    ];

      const commits = await CommitMessage.aggregate(query);
      return commits;
    } catch (error) {
      throw error;
    }
  }
};

