import { Schema, model } from 'mongoose';

const messageSchema = Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
  },
  { timestamps: true },
);

export const Message = model('Message', messageSchema);
