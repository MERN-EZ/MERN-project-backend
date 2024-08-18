import express from "express";
import { registerStudent } from "../../controllers/guest/registrationController.js";

const router = express.Router();

router.post("/", registerStudent);

export default router;
