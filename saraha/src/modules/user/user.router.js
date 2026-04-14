import { Router } from 'express';
import * as userController from './user.controller.js';
import { uploadFile } from '../../../utils/multer.js';
const router = Router();

router.post('/profile-image', uploadFile().single('profileImage'), userController.uploadProfileImage);
export default router;
