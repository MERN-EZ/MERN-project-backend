// Define routes to handle API requests for student requests.

import express from 'express';
import { 
    getAllStudentRequests, 
    acceptStudentRequest, 
    rejectStudentRequest 
} from '../../controllers/admin/studentRequestController.js';

const router = express.Router();

// Route to get all student requests
router.get('/', getAllStudentRequests);

// Route to accept a student request
router.post('/accept/:id', acceptStudentRequest);

// Route to reject a student request
router.post('/reject/:id', rejectStudentRequest);

export default router;
