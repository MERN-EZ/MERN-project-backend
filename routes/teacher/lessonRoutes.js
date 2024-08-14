import express from 'express';
import {
  createLesson,
  getAllLessons,
  // getLessonById,
  updateLesson,
  updateHomework,
  deleteLesson,
} from '../../controllers/teacher/lessonController.js';

const router = express.Router();

// Get all lessons
router.get('/', getAllLessons);
// Create a new lesson
router.post('/', createLesson);
router.put('/:id', updateLesson);

router.delete('/:id', deleteLesson);

// Get a lesson by ID
// router.get("/:id", getLessonById);

// Update a lesson by ID
// router.put("/:id", updateLesson);

// Delete a lesson by ID
router.delete('/:id', deleteLesson);

router.put('/homework/:id', updateHomework);
export default router;
