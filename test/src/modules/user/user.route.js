import { Router } from 'express';
import * as userController from './user.controller.js';
import { validation } from '../../middlewares/validation.middleware.js';
import { signupSchema } from './user.schema.js';
const router = Router();

// sign up route
router.post('/signup',validation(signupSchema),userController.signUp);

export default router;
