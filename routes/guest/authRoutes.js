import express from 'express';
import { loginStudent } from '../../controllers/guest/authController.js';
import { loginStaff, registerStaff } from '../../controllers/guest/staffAuthController.js';
import { loginAssistant } from '../../controllers/guest/assistantAuthController.js';

const router = express.Router();

// Login route
router.post('/login', loginStudent);
router.post('/login/staff', loginStaff);
router.post('/register/staff', registerStaff);
router.post('/login/assistant', loginAssistant);

export default router;
