import express from 'express';
import { updateStudentProfile, deleteStudentProfile  } from '../../controllers/student/profileController.js';

const router = express.Router();

router.delete('/delete-profile', deleteStudentProfile);
router.put('/edit-profile', updateStudentProfile); 

export default router;
