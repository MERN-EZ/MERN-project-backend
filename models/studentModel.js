import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  registeredDate: { type: Date, default: Date.now },
  studentId: { type: String, unique: true },
});

const getStudentModel = (dbConnection) =>
  dbConnection.model('Student', studentSchema);

export { getStudentModel };
