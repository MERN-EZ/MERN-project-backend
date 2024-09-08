import express from 'express';
import { createAttendanceRecord } from '../../controllers/assistant/attendanceController';
import { updateAssistant } from '../../controllers/admin/assistantController';

const router = express.Router();

router.post('/', createAttendanceRecord);
router.put('/', updateAssistant);

export default router;
