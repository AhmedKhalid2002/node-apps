import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 70 },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export  const User = model('User', userSchema);
