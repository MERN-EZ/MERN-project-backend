import express from "express";
import { getHomeWorks, addSubmission, updateSubmission } from "../../controllers/student/homeworkController.js";

const router = express.Router();

// Get all homeworks
router.get("/", getHomeWorks);

// Get a specific homework by ID
router.get("/:id", getHomeWorks);

// Add a submission to a specific homework
router.post("/homework-submissions/:lessonId/:homeworkId", addSubmission);


// router.get("/check-submission/:homeworkId/:studentId", checkStudentSubmission);

// Route to update an existing homework submission
router.put("/homework-submissions/:homeworkId/:studentId", updateSubmission);

export default router;
