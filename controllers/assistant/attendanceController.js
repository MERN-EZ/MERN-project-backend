import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const createAttendanceRecord = async (req, res) => {
  logger.info('Creating a new attendance record');
  // logger.info(req.body);
  try {
    const Attendance = getAttendanceModel(req.dbConnection);

    // Create a new attendance record using the request body
    const attendanceRecord = new Attendance(req.body);

    // Save the attendance record to the database
    await attendanceRecord.save();

    logger.info('Attendance record created successfully');

    // Send a success response with the created record
    res.status(201).json(attendanceRecord);
  } catch (err) {
    logger.error('Error creating attendance record:', err);

    // Send an error response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Update attendance by student ID
export const updateAttendance = async (req, res) => {
  logger.info('Updating attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection); // Assuming you have an attendance model
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id, // The student ID provided as a parameter in the request
      { $set: { attendance: req.body.attendance } }, // Update attendance status (boolean or string)
      {
        new: true, // Return the newly updated document
        runValidators: true, // Run schema validators
      }
    );

    // Check if the student attendance record exists
    if (!updatedAttendance) {
      return res.status(404).json({ error: 'Student attendance record not found' });
    }

    logger.info('Attendance updated successfully');
    res.status(200).json(updatedAttendance);
  } catch (err) {
    logger.error('Error updating attendance:', err);
    res.status(400).json({ error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  logger.info('Updating attendance for a student');
  try {
    const Attendance = getAttendanceModel(req.dbConnection); // Assuming you have an attendance model

    res.status(200).json({ message: 'getting attendance' });
  } catch (err) {
    logger.error('Error updating attendance:', err);
    res.status(400).json({ error: err.message });
  }
};
