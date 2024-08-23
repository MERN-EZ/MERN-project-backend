import express from 'express';
import { getSubmissions } from '../../controllers/teacher/lessonController.js';

const router = express.Router();

router.get('/:lessonId/:homework', getAllLessons);

export default router;
