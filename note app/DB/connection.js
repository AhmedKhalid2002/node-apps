import mongoose from 'mongoose';

export const connectDb = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_DB)
    .then(() => console.log('Db connected successfully'))
    .catch(() => console.log(`Faild connect with Db`));
};
