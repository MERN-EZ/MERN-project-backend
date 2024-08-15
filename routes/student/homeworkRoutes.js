import express from "express";
import { getHomeWorks  } from "../../controllers/student/homeworkController.js";

const router = express.Router();

router.get("/", getHomeWorks);
router.get("/:id", getHomeWorks , );
export default router;