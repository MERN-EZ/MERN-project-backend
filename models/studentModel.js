import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transactionId:{type: String, required: true},
  status: {type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'}
});

const getStudentModel = (dbConnection) => dbConnection.model('Student', studentSchema);

export { getStudentModel };
