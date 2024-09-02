import express from 'express';
import { loginStudent } from '../../controllers/guest/studentAuthController.js';
import { loginStaff, registerStaff } from '../../controllers/guest/staffAuthController.js';
import { loginAssistant } from '../../controllers/guest/assistantAuthController.js';

const router = express.Router();

router.post('/login', loginStudent);
router.post('/login/staff', loginStaff);
router.post('/register/staff', registerStaff);
router.post('/login/assistant', loginAssistant);

export default router;
