const { Schema, model } = require('mongoose');

const messageSchema = Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
  },
  { timestamps: true },
);

export const Message = model('Message', messageSchema);
