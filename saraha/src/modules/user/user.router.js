import { Router } from 'express';
import * as userController from './user.controller.js';
import { uploadFile } from '../../../utils/multer.js';
import { isAuthenticated } from "../../middleware/auth.middleware.js";
const router = Router();

router.post('/profile-image',isAuthenticated,uploadFile({folderName:'/users/profile-user'}).single('profileImage'), userController.uploadProfileImage);
router.get('/cover-image',isAuthenticated,uploadFile({folderName:'/users/cover-user'}).array('coverImage',3), userController.uploadCoverImage);
export default router;
