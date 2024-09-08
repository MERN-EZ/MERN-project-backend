import express from 'express';
import { createAttendanceRecord } from '../../controllers/assistant/attendanceController.js';
import { updateAttendance, getAttendance , deleteAttendance } from '../../controllers/assistant/attendanceController.js';
import { updateAssistant } from '../../controllers/admin/assistantController.js';


const router = express.Router();

router.post('/', createAttendanceRecord);
router.put('/', updateAssistant);
router.put('/edit', updateAttendance);
router.put('/attendance', updateAttendance);
router.get('/:searchId', getAttendance);
router.delete('/:studentId/:date', deleteAttendance);

export default router;
