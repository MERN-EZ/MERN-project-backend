import express from 'express';
import { loginStudent } from '../../controllers/guest/authController.js';

const router = express.Router();

// Login route
router.post('/login', loginStudent);

export default router;
