import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present',
  },
});

export const getAttendanceModel = (connection) => {
  return connection.model('attendance', attendanceSchema);
};
