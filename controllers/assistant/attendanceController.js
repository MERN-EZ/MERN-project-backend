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

    const isExist = await Attendance.findOne({ studentId: studentID, date: date });
    if (!isExist) {
      logger.error('Attendance record not found');
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

    if (!updatedAttendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

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

export const deleteAttendanceById = async (req, res) => {
  logger.info('Deleting attendance record');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const { id } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    logger.info('Attendance record deleted successfully');
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (err) {
    logger.error('Error deleting attendance record:', err);
    res.status(400).json({ error: err.message });
  }
};
