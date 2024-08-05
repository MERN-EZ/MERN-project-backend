import Lesson from "../models/lessonModel.js";
import logger from "../utils/logger.js";

// Create a new lesson
export const createLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all lessons
export const getAllLessons = async (req, res) => {
  logger.info("Getting all lessons");
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a lesson by ID
// export const getLessonById = async (req, res) => {
//   try {
//     const lesson = await Lesson.findById(req.params.id);
//     if (!lesson) {
//       return res.status(404).json({ error: "Lesson not found" });
//     }
//     res.status(200).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update a lesson by ID
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a lesson by ID
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
