import { Router } from 'express';
import * as userController from './user.controller.js';
import { validation } from '../../middlewares/validation.middleware.js';
import { loginSchema, resetPasswordSchema, signupSchema } from './user.schema.js';
const router = Router();

// sign up route
router.post('/signup',validation(signupSchema),userController.signUp);
// login route
router.post('/login',validation(loginSchema),userController.login);
// activate account route
router.get('/activate_acount/:token',userController.activateAccount);

// reset password route
router.patch('/reset_password',validation(resetPasswordSchema),userController.resetPassword);

// code verification route
router.post('/code_verification',validation(codeSchema),userController.sendCode);
export default router;
