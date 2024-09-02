// Handles the business logic for creating, retrieving, updating, and deleting assistants.
import { getAssistantModel } from '../../models/assistantModel.js';
import logger from '../../utils/logger.js';

// Create a new assistant
export const createAssistant = async (req, res) => {
  console.log('Creating a new assistant');
  try {
    const { assistantId, firstName, lastName, username, password, email, phoneNumber } = req.body;

    console.log('assistantId:', assistantId);
    console.log('firstName:', firstName);
    console.log('lastName:', lastName);
    console.log('username:', username);
    console.log('password:', password);
    console.log('email:', email);
    console.log('phoneNumber:', phoneNumber);

    const Assistant = getAssistantModel(req.dbConnection);

    // Check if assistantId already exists
    const existingAssistantId = await Assistant.findOne({ assistantId });
    if (existingAssistantId) {
      return res.status(400).json({ error: 'Validation Error', message: 'assistantId must be unique' });
    }

    // Check if username already exists
    const existingUsername = await Assistant.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Validation Error', message: 'username must be unique' });
    }

    // Check if email already exists
    const existingEmail = await Assistant.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Validation Error', message: 'email must be unique' });
    }

    // Check if phoneNumber already exists
    const existingPhoneNumber = await Assistant.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ error: 'Validation Error', message: 'phoneNumber must be unique' });
    }

    // Create a new Assistant document
    const assistant = new Assistant(req.body);
    console.log(`Assistant ${assistant}`);

    // Save the assistant to the database
    await assistant.save();
    console.log('Assistant created successfully');
    res.status(201).json(assistant);
  } catch (err) {
    logger.error('Error creating assistant:', err);

    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(err.errors).map((e) => e.message);
      console.error(errors);
      res.status(400).json({ error: 'Validation Error', details: errors });
    } else {
      // Handle other errors
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  }
};

// Get all assistants
export const getAllAssistants = async (req, res) => {
  console.log('Retrieving all assistants');
  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const assistants = await Assistant.find();
    // console.log(`Print all Assistants! ${assistants}`);
    console.log('Assistants retrieved successfully');
    res.status(200).json(assistants);
  } catch (err) {
    logger.error('Error retrieving assistants:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update an assistant by ID
export const updateAssistant = async (req, res) => {
  console.log('Updating an assistant');
  // Log the request body to see what data is being sent
  console.log(`Request body:  ${req.body}`);

  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const assistant = await Assistant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the assistant with the request body data
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(`Updated Assistant: ${assistant}`);
    if (!assistant) {
      return res.status(404).json({ error: 'Assistant not found' });
    }
    console.log('Assistant updated successfully');
    res.status(200).json(assistant);
  } catch (err) {
    logger.error('Error updating assistant:', err);
    res.status(400).json({ error: err.message });
  }
};

// Delete an assistant by ID
export const deleteAssistant = async (req, res) => {
  console.log('Deleting an assistant');
  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const deletedAssistant = await Assistant.findByIdAndDelete(req.params.id);

    if (!deletedAssistant) {
      return res.status(404).json({ error: 'Assistant not found' });
    }
    console.log('Assistant deleted successfully');
    res.status(200).json({ message: 'Assistant deleted successfully' });
  } catch (err) {
    logger.error('Error deleting assistant:', err);
    res.status(500).json({ error: err.message });
  }
};
