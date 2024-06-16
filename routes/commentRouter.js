import express from 'express';
import { addComment, editComment, deleteComment, getComments } from '../controllers/commentController.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

router.post('/', verifyAuth, addComment);
router.put('/:id', verifyAuth, editComment);
router.delete('/:id', verifyAuth, deleteComment);
router.get('/:workoutId', getComments);

export default router;