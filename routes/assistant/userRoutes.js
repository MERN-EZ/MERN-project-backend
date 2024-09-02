import express from 'express';
import { getAllStudentDetails } from '../../controllers/assistant/requestController.js';

const router = express.Router();

router.get('/', getAllStudentDetails);

export default router;
