import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const createAttendanceRecord = async (req, res) => {
  logger.info('Creating a new attendance record');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);

    const attendanceRecord = new Attendance(req.body);

    await attendanceRecord.save();

    logger.info('Attendance record created successfully');

    res.status(201).json(attendanceRecord);
  } catch (err) {
    logger.error('Error creating attendance record:', err);

    res.status(400).json({ error: err.message });
  }
};

export const updateAttendance = async (req, res) => {
  logger.info('Updating attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const { studentID, date, attendance } = req.body;
    console.log('Body data', req.body);

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { studentId: studentID, date: date },
      { $set: { status: attendance } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    logger.info('Attendance updated successfully');
    res.status(200).json(updatedAttendance);
  } catch (err) {
    logger.error('Error updating attendance:', err);
    res.status(400).json({ error: err.message });
  }
};
