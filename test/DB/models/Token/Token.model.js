import { model, Schema, Types } from 'mongoose';

const tokenSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    
    agent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Token = model('Token', tokenSchema);