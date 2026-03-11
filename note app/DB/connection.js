import mongoose from 'mongoose';

export const connectDb = async () => {
  return await mongoose
    .connect('mongodb://127.0.0.1:27017/notes')
    .then(() => console.log('Db connected successfully'))
    .catch(() => console.log(`Faild connect with Db`));
};
