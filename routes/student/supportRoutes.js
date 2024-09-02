import express from 'express';
import { sendMessage } from '../../controllers/student/supportController.js';

const router = express.Router();

router.post('/support', sendMessage);

export default router;
