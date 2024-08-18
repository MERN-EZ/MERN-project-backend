import { getStudentModel } from '../../models/studentModel.js';
import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const registerStudent = async (req, res) => {
  const { firstName, lastName, contactNumber, email, username, password } =
    req.body;

  try {
    // Get the Student model for the current database connection
    const Student = getStudentModel(req.dbConnection);

    // Create a new student record
    const newStudent = new Student({
      firstName,
      lastName,
      contactNumber,
      email,
      username,
      password,
    });

    // Save the new student to the database
    await newStudent.save();

    const Attendance = getAttendanceModel(req.dbConnection);
    const newAttendance = new Attendance({
      firstName,
      lastName,
      attendance: {},
    });
    await newAttendance.save();

    logger.info(`New student registered: ${username}`);
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    logger.error('Error registering student:', error);

    // Check if the error is related to unique fields (e.g., email, username)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Email or Username already exists' });
    }

    res.status(500).send('Internal Server Error');
  }
};
