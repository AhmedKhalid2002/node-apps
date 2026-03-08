import { Product } from '../../../DB/models/product.model.js';
import { User } from '../../../DB/models/user.model.js';

export const addProduct = async (req, res, next) => {
  try {
    await Product(req.body, { fields: ['name', 'price', 'userId'] });
    return res.json({
      success: true,
      message: 'Product created successfully',
    });
  } catch (error) {
    return res.json({
      success: true,
      message: error.errors[0].message,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { price, userId } = req.body;
  const results = await Product.update({ price }, { where: { id, userId } });
  if (results[0] == 0) {
    return res.json({
      success: true,
      message: 'product or user not found',
    });
  }

  return res.json({
    success: true,
    message: 'Product addded successfully',
  });
};

export const filterProduct = async (req, res, next) => {
  const { price } = req.query;
  const products = await Product.findAll({
    where: { price: { [op.lt]: price } },
  });
  return res.json({
    success: true,
    products,
  });
};

export const allProduct = async (req, res, next) => {
  const products = await Product.findAll({ include: User });
  return res.json({
    success: true,
    products,
  });
};
