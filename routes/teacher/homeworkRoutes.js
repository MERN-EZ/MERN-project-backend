import express from 'express';
import { addHomework, updateHomework, deleteHomework } from '../../controllers/teacher/homeworkController.js';
import { getHomeWorks } from '../../controllers/student/homeworkController.js';

const router = express.Router();

router.get('/', getHomeWorks);
router.put('/:lessonId', addHomework);
router.put('/:lessonId/:homeworkId', updateHomework);
router.delete('/:lessonId/:homeworkId', deleteHomework);
export default router;
