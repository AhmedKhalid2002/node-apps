import { Router } from 'express';
import * as controller from './user.controller.js';

const router = Router();

router.post('/', controller.createUser);
router.get('/', controller.allUser);
router.get('/', controller.filterUser);
router.put('/', controller.updateUser);
router.delete('/', controller.deleteUser);

export default router;
