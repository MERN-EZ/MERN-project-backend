// Routes to map HTTP requests to the appropriate controller functions.

import express from 'express';
import {
  createAssistant,
  getAllAssistants,
  updateAssistant,
  deleteAssistant,
} from '../../controllers/admin/assistantController.js';

const router = express.Router();

// Route to create a new assistant
router.post('/', createAssistant);
// Route to display all assistants
router.get('/', getAllAssistants);

// // Route to update an assistant by ID
router.put('/:id', updateAssistant);

// // Route to delete an assistant by ID
router.delete('/:id', deleteAssistant);

export default router;
