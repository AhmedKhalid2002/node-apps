import { Router } from 'express';
import { addProduct, filterProduct, deleteProduct, updateProduct, allProduct } from './product.controller.js';

const router = Router();

// add product
router.post('/', addProduct);

// update product
router.put('/', updateProduct);

// delete product
router.delete('/', deleteProduct);

// filter product
router.get('/filter', filterProduct);
// all product
router.get('/filter', allProduct);
export default router;
