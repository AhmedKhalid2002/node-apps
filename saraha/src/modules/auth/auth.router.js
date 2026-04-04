import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validation } from '../../middleware/validation.middleware.js';
import { loginSchema, signupSchema } from './auth.schema.js';
const router = Router();

// sign up
router.post('/signup', validation(signupSchema),authController.signUp);
// login
router.post('/login', validation(loginSchema), authController.login);

export default router;
