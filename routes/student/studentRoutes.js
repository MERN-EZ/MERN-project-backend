import express from "express";
import { getStudentById} from "../../controllers/student/profileController.js";

const router = express.Router();

router.get("/:id", getStudentById);
export default router;