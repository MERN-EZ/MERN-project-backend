import express from 'express';
import { getAllnames } from '../../controllers/assistant/requestController.js';

const router = express.Router();

router.get('/', getAllnames);
export default router;
