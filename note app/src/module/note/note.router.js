import { Router } from 'express';
import * as controller from './note.controller.js';
const router = Router();

router.post('/', controller.createNote);
router.patch('/:id', controller.updateNote);
router.delete('/:id', controller.deleteNote);
router.get('/', controller.allNotes);

// get user notes
router.get('/user/:id', controller.userNote);

export default router;
