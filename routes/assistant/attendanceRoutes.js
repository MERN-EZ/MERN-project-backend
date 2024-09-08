import express from 'express';
import { createAttendanceRecord } from '../../controllers/assistant/attendanceController.js';
import { updateAttendance } from '../../controllers/assistant/attendanceController.js';
import { updateAssistant } from '../../controllers/admin/assistantController.js';

const router = express.Router();

router.post('/', createAttendanceRecord);
router.put('/', updateAssistant);
router.put('/attendance', updateAttendance);

export default router;
