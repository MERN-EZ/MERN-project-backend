import express from 'express';
import {
  createLesson,
  getAllLessons,
  // getLessonById,
  updateLesson,
  deleteLesson,
} from '../../controllers/teacher/lessonController.js';
import {
  updateHomework,
  deleteHomework,
} from '../../controllers/teacher/homeworkController.js';

const router = express.Router();

router.get('/', getAllLessons);
router.post('/', createLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

router.put('/homework/:lessonId', updateHomework);
router.delete('/homework/:lessonId/:homeworkId', deleteHomework);
export default router;
