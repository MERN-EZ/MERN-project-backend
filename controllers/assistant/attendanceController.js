import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const createAttendanceRecord = async (req, res) => {
  logger.info('Creating a new attendance record');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);

    // Validate the received data
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

// Update attendance by student ID
export const updateAttendance = async (req, res) => {
  logger.info('Updating attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection); // Get the attendance model
    const { studentID, date, attendance } = req.body; // Destructure the required fields from the body
    console.log('Body data', req.body);

    // Find and update the attendance record

    const isExist = await Attendance({ studentId: studentID, date: date });
    if (!isExist) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { studentId: studentID, date: date }, // Use both studentID and date to find the record
      { $set: { status: attendance } }, // Update the status field
      {
        new: true, // Return the newly updated document
        runValidators: true, // Run schema validators
      }
    );

    // Check if the attendance record was found and updated
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
    const Attendance = getAttendanceModel(req.dbConnection); // Assuming you have an attendance model
    const id = req.params.searchId;
    logger.info(`StudentId is ${id}`);
    const attendanceRecords = await Attendance.find({ studentId: id });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    logger.error('Error getting attendance:', err);
    res.status(400).json({ error: err.message });
  }
};
