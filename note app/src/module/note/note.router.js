import { Router } from 'express';
import * as controller from './note.controller.js';
import { authentication } from '../../middleware/auth.middleware.js';
const router = Router();

router.post('/', authentication, controller.createNote);
router.patch('/:id', authentication, controller.updateNote);
router.delete('/:id', authentication, controller.deleteNote);
router.get('/', controller.allNotes);

// get user notes
router.get('/user/:id', controller.userNote);

export default router;
