import mongoose from 'mongoose';

export const connectDB = async () => {
  return await mongoose
    .connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Database connected '))
    .catch(()=>console.log('Database is not connected')
    );
};
