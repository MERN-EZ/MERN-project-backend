// routes/supportRoutes.js
import express from 'express';
import { sendMessage } from '../../controllers/student/supportController.js';

const router = express.Router();

// POST route for sending a support message
router.post('/support', sendMessage);

export default router;
