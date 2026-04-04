import { Router } from "express";
import * as messageController from "./message.controller.js";    
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { messageSchema } from "./message.schema.js";
const router = Router()

// send message
router.post('/',isAuthenticated,validation(messageSchema),messageController.sendMessage);

// get user messages
router.get('/', messageController.userMessages);

export default router;