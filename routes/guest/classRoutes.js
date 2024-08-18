import express from 'express';
import { getClasses } from '../../controllers/guest/classController.js';

const router = express.Router();

router.get('/', getClasses);

export default router;
