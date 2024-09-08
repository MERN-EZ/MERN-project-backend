import express from 'express';
import { createAttendanceRecord } from '../../controllers/assistant/attendanceController.js';
import { updateAttendance } from '../../controllers/assistant/attendanceController.js';


const router = express.Router();

router.post('/', createAttendanceRecord);
router.put('/attendance/edit', updateAttendance);

export default router;
