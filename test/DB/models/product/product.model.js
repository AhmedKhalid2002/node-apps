import { Schema, Types } from 'mongoose';

const productSchema = Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Product = model('Product', productSchema);
