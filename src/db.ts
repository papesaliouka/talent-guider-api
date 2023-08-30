import mongoose, { ConnectOptions } from 'mongoose';

interface MyOption extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: MyOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


export const connectToDatabase = async (dbName: string) => {
  const dbConnection = await mongoose.createConnection(`mongodb+srv://pskath1:sb2yyNkaCJtPJ5h4@mongoflix.tw5gy.mongodb.net/${dbName}`, options);

  return dbConnection;
};
