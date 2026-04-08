import { Product } from '../../../DB/models/product/product.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description } = req.body;

  const product = await Product.create({ name, price, description });

  if (!product) return next(new Error('Failed to create product'));
  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});
