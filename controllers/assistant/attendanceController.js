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
    const Attendance = getAttendanceModel(req.dbConnection); // Get the attendance model
    const { studentID, date, attendance } = req.body; // Destructure the required fields from the body
    console.log('Body data' , req.body);

    // Find and update the attendance record
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
    res.status(200).json(updatedAttendance);
  } catch (err) {
    logger.error('Error updating attendance:', err);
    res.status(400).json({ error: err.message });
  }
};
