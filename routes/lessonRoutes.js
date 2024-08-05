import express from "express";
import {
  createLesson,
  getAllLessons,
  // getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";

const router = express.Router();

// Create a new lesson
router.post("/", createLesson);

// Get all lessons
router.get("/", getAllLessons);

// Get a lesson by ID
// router.get("/:id", getLessonById);

// Update a lesson by ID
router.put("/:id", updateLesson);

// Delete a lesson by ID
router.delete("/:id", deleteLesson);

export default router;
