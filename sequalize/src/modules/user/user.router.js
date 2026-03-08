import { Router } from 'express';
import { login, signup } from './user.controller.js';

const router = Router();

// signup
router.post('/signup', signup);
// signup
router.post('/login', login);


export default router;
