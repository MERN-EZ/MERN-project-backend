import express from 'express';
import { getClass } from '../../controllers/teacher/classController.js';

const router = express.Router();

router.get('/', getClass);

export default router;
