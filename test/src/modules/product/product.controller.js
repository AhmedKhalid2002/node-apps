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

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, description },
    { new: true },
  );

  if (!product) return next(new Error('Failed to update product'));
  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

export const filterProducts = asyncHandler(async (req, res, next) => {
  const { name, price } = req.query;
  //   build filter object
  const filter = {};

  if (name) filter.name = name;
  if (price) filter.price = price;

  const products = await Product.findAll({ where: filter });

  return res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    products,
  });
});
