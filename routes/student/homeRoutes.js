import express from 'express';
import { getClass } from '../../controllers/student/homeController.js';

const router = express.Router();

router.get('/', getClass);

export default router;
