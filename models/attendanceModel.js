import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  attendance: {
    type: Map,
    of: String,
    required: true,
  },
});

export const getAttendanceModel = (connection) => {
  return connection.model('attendance', userSchema);
};
