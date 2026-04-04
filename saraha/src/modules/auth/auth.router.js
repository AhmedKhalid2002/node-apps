import { Router } from 'express';
import * as authController from './auth.controller.js';
const router = Router();

// sign up
router.post('/signup', authController.signUp);
// login
router.post('/login', authController.login);

export default router;
