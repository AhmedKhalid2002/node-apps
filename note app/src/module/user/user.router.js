import { Router } from 'express';
import * as controller from './user.controller.js';
import { authentication } from '../../middleware/auth.middleware.js';
const router = Router();

// signup
router.post('/signup', controller.signup);
// login
router.post('/login', controller.login);

// logout
router.post('/login', authentication,controller.logout);

export default router;
