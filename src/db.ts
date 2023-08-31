import mongoose, { ConnectOptions } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

interface MyOption extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: MyOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection ready')
});

mongoose.connection.on('error', (err)=> {
    console.error(err)
})


const URI: string = process.env.MONGO_URI || "";

export const connectToDatabase = async (dbname: string) => {
  const dbConnection = mongoose.createConnection(`${URI}/${dbname}`, options);
  return dbConnection;
};

export const mongoConnect = async () => {
    await mongoose.connect(URI, options);
    console.log('MongoDB connected');
};
