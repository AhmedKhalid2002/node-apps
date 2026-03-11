import { Router } from 'express';
import * as controller from './user.controller.js';
const router = Router();

// signup
router.post('/signup', controller.signup);
// login
router.post('/login', controller.login);

export default router;
