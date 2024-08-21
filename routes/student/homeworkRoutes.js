import express from "express";
import { getHomeWorks, addSubmission, updateSubmission, deleteSubmission}  from "../../controllers/student/homeworkController.js";

const router = express.Router();

// Get all homeworks
router.get("/", getHomeWorks);

// Get a specific homework by ID
router.get("/:id", getHomeWorks);

// Add a submission to a specific homework
router.post("/homework-submissions/:lessonId/:homeworkId", addSubmission);

// Route to update an existing homework submission
router.put("/homework-submissions/:homeworkId/:studentId", updateSubmission);

router.delete("/homework-submissions/:homeworkId/:studentId", deleteSubmission);

export default router;
