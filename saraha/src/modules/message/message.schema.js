import Joi from 'joi';
import { Types } from 'mongoose';

export const messageSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content cannot be empty',
    'string.min': 'Content must be at least 1 character',
    'string.max': 'Content must be at most 500 characters',
    'string.required': 'Content is required',
  }),
  receiver: Joi.required().custom((value, helper) => {
    return Types.ObjectId.isValid(value)
      ? value
      : helper.message('Invalid receiver id');
  }), //object id mongoose
  sender:Joi.required().custom((value,helper)=>{
    return Types.ObjectId.isValid(value)
    ? value
    : helper.message('Invalid sender id');  
  })
}).required();
