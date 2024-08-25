// routes/student/studentRoutes.js
import express from 'express';
import { updateStudentProfile, deleteStudentProfile  } from '../../controllers/student/profileController.js';

const router = express.Router();

//router.get('/:id', getStudentById);
router.delete('/delete-profile', deleteStudentProfile);
router.put('/edit-profile', updateStudentProfile); // New route for updating profile

export default router;
