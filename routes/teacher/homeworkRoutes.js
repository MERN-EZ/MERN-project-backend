import express from 'express';
import {
  addHomework,
  updateHomework,
  deleteHomework,
} from '../../controllers/teacher/homeworkController.js';

const router = express.Router();

router.put('/:lessonId', addHomework);
router.put('/:lessonId/:homeworkId', updateHomework);
router.delete('/:lessonId/:homeworkId', deleteHomework);
export default router;
