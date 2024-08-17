import express from "express";
import { getHomeWorks, addSubmission } from "../../controllers/student/homeworkController.js";

const router = express.Router();

// Get all homeworks
router.get("/", getHomeWorks);

// Get a specific homework by ID
router.get("/:id", getHomeWorks);

// Add a submission to a specific homework
router.put("/homework-submissions/:homeworkId", addSubmission);

export default router;
