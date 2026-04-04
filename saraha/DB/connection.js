import mongoose from 'mongoose';

export const connectDb = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error connecting to database'));
};
