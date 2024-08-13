import express from "express";
import { getHomeWorks , getHomeworkById } from "../../controllers/student/homeworkController.js";

const router = express.Router();

router.get("/", getHomeWorks);
router.get("/:id", getHomeworkById);

export default router;