import mongoose from 'mongoose';

// Define the schema for support messages
const supportMessageSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Function to get the SupportMessage model
const getSupportMessageModel = (dbConnection) =>
  dbConnection.model('SupportMessage', supportMessageSchema);

export { getSupportMessageModel };
