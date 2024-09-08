import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const createAttendanceRecord = async (req, res) => {
  logger.info('Creating a new attendance record');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);

    console.log('Body data', req.body);
    const { studentId, date, status } = req.body;
    if (!studentId || !date || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const attendanceRecord = new Attendance(req.body);
    await attendanceRecord.save();
    logger.info('Attendance record created successfully');
    res.status(201).json(attendanceRecord);
  } catch (err) {
    logger.error(`Error creating attendance record: ${err}`);
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation Error' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

export const updateAttendance = async (req, res) => {
  logger.info('Updating attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const { studentID, date, attendance } = req.body;
    console.log('Body data', req.body);

    const existingRecord = await Attendance.findOne({ studentId: studentID, date: date });
    if (!existingRecord) {
      console.log('Attendance record not found');
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { studentId: studentID, date: date },
      { $set: { status: attendance } },
      {
        new: true,
        runValidators: true,
      }
    );

    logger.info('Attendance updated successfully');
    res.status(200).json({ message: updatedAttendance });
  } catch (err) {
    logger.error('Error updating attendance:', err);
    res.status(400).json({ error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  logger.info('Getting attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const id = req.params.searchId;
    logger.info(`StudentId is ${id}`);
    const attendanceRecords = await Attendance.find({ studentId: id });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    logger.error('Error getting attendance:', err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteAttendance = async (req, res) => {
  logger.info('Deleting attendance record by ID and Date');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const { id, date } = req.params;
    
    // Find the attendance record by ID and date
    const attendanceRecord = await Attendance.findOne({ _id: id, date: date });
    
    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    // Delete the record
    await Attendance.deleteOne({ _id: id, date: date });
    
    logger.info('Attendance record deleted successfully');
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    logger.error('Error deleting attendance record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};