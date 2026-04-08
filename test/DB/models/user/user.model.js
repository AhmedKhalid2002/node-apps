import { model, Schema } from 'mongoose';

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isConformed: { type: Boolean, default: false },
    forgetCode: { type: String },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
