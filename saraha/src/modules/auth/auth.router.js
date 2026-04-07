import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validation } from '../../middleware/validation.middleware.js';
import { forgetPasswordSchema, loginSchema, signupSchema } from './auth.schema.js';
const router = Router();

// sign up
router.post('/signup', validation(signupSchema),authController.signUp);
// login
router.post('/login', validation(loginSchema), authController.login);

// confirm email
router.get('/confirm-email/:id',authController.confirmEmail);

// send password reset code
router.patch('/send-reset-code',validation(forgetPasswordSchema) ,authController.sendResetCode);

// reset password
router.post('/reset-password', validation(resetPasswordSchema), authController.resetPassword);
export default router;
