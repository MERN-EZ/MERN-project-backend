// routes/student/studentRoutes.js
import express from 'express';
import { updateStudentProfile } from '../../controllers/student/profileController.js';

const router = express.Router();

//router.get('/:id', getStudentById);
router.put('/edit-profile', updateStudentProfile); // New route for updating profile

export default router;
