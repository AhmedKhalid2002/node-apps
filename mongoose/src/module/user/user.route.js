import { Router } from 'express';
import * as controller from './user.controller.js';

const router = Router();

router.post('/', controller.createUser);
router.get('/', controller.allUser);
router.get('/', controller.spicificUser);

export default router;
