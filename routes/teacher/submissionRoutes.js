import express from 'express';
import { getSubmissions } from '../../controllers/teacher/submissionController.js';

const router = express.Router();

router.get('/:lessonId/:homeworkId', getSubmissions);

export default router;
