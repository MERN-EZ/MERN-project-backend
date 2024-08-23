// Handles the business logic for creating, retrieving, updating, and deleting assistants.

import { getAssistantModel } from '../../models/assistantModel.js';
import logger from '../../utils/logger.js';

// Create a new assistant
export const createAssistant = async (req, res) => {
  logger.info('Creating a new assistant');
  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const assistant = new Assistant(req.body);

    // Save the assistant to the database
    await assistant.save();
    logger.info('Assistant created successfully');
    res.status(201).json(assistant);
  } catch (err) {
    logger.error('Error creating assistant:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all assistants
export const getAllAssistants = async (req, res) => {
  logger.info('Retrieving all assistants');
  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const assistants = await Assistant.find();
    res.status(200).json(assistants);
  } catch (err) {
    logger.error('Error retrieving assistants:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update an assistant by ID
// export const updateAssistant = async (req, res) => {
//   logger.info('Updating an assistant');
//   try {
//     const Assistant = getAssistantModel(req.dbConnection);
//     const assistant = await Assistant.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },  // Update the assistant with the request body data
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!assistant) {
//       return res.status(404).json({ error: 'Assistant not found' });
//     }
//     logger.info('Assistant updated successfully');
//     res.status(200).json(assistant);
//   } catch (err) {
//     logger.error('Error updating assistant:', err);
//     res.status(400).json({ error: err.message });
//   }
// };

// Delete an assistant by ID
// export const deleteAssistant = async (req, res) => {
//   logger.info('Deleting an assistant');
//   try {
//     const Assistant = getAssistantModel(req.dbConnection);
//     const deletedAssistant = await Assistant.findByIdAndDelete(req.params.id);

//     if (!deletedAssistant) {
//       return res.status(404).json({ error: 'Assistant not found' });
//     }
//     logger.info('Assistant deleted successfully');
//     res.status(200).json({ message: 'Assistant deleted successfully' });
//   } catch (err) {
//     logger.error('Error deleting assistant:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
