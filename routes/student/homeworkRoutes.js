import express from "express";
import { getHomeWorks, addSubmission, updateSubmission, deleteSubmission}  from "../../controllers/student/homeworkController.js";

const router = express.Router();
router.get("/", getHomeWorks);
router.get("/:id", getHomeWorks);
router.post("/homework-submissions/:lessonId/:homeworkId", addSubmission);
router.put("/homework-submissions/:homeworkId/:studentId", updateSubmission);
router.delete("/homework-submissions/:homeworkId/:studentId", deleteSubmission);

export default router;
