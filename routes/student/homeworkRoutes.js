import express from "express";
import { getHomeWorks } from "../../controllers/student/homeworkController";

const router = express.Router();

router.get("/student_homework", getHomeWorks);

export default router;