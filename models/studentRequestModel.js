// Mongoose model to represent student requests
import mongoose, { connection } from "mongoose";

const { Schema } = mongoose; // Destructure Schema from mongoose for easy use

// Define the student requests schema
const studentRequestSchema = new Schema({
  stId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  registeredDate: { type: Date, required: true },
  batch: { type: Number, required: true },
  lastName: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'accepted', 'rejected'] }, 
});

// Create and export a function to get the StudentRequest model

export const studentRequestModel = (connection) => {
    // Create and return the model for the student request schema
    return connection.model("studentRequest", studentRequestSchema);
}
