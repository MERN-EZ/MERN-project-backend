import express from 'express';
import { getMessages, deleteMessage } from '../../controllers/teacher/feedbackController.js';

const router = express.Router();

router.get('/', getMessages);
router.delete('/:id', deleteMessage);

export default router;
