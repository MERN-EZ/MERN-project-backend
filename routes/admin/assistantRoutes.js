// Routes to map HTTP requests to the appropriate controller functions.

import express from 'express';
import {
  createAssistant,
  getAllAssistants,
  //   updateAssistant,
  //   deleteAssistant,
} from '../../controllers/admin/assistantController.js';

const router = express.Router();

// Route to create a new assistant and display all assistants
router.post('/', Assistant);


// // Route to update an assistant by ID
// router.put('/:id', updateAssistant);

// // Route to delete an assistant by ID
// router.delete('/:id', deleteAssistant);

export default router;
