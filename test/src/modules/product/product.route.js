import { Router } from 'express';
import * as controller from './product.controller.js';
import { isAuthandicated } from '../../middlewares/auth.middleware.js';
import { validation } from '../../middlewares/validation.middleware.js';
import { createProductSchema, updateProductSchema } from './product.schema.js';
const router = Router();
// create product
router.post('/', isAuthandicated,validation(createProductSchema) ,controller.createProduct);
// update product
router.put('/:id', isAuthandicated,validation(updateProductSchema) ,controller.updateProduct);
export default router;
