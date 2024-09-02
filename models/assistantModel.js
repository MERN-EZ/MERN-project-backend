// Defines the structure of the Assistant in MongoDB.
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the assistant schema
const assistantSchema = new mongoose.Schema({
  assistantId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
});

// Create the Assistant model
export const getAssistantModel = (connection) => {
  return connection.model('Assistant', assistantSchema);
};
