import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
}).required();

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
}).required();