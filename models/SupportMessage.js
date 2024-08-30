// models/SupportMessage.js
import mongoose from 'mongoose';

const SupportMessageSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  batch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const SupportMessage = mongoose.model('SupportMessage', SupportMessageSchema);
