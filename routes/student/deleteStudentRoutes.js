import express from 'express';
import { deleteStudentProfile } from '../../controllers/student/profileController.js';

const router = express.Router();

// Route to handle deletion of the logged-in student's profile
router.delete('/delete-profile', deleteStudentProfile);

export default router;
