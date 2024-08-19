import { getStudentModel } from '../../models/studentModel.js';
import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const registerStudent = async (req, res) => {
  const { firstName, lastName, contactNumber, email, username, password,transactionId, } =
    req.body;

  try {
    // Get the Student model for the current database connection
    const Student = getStudentModel(req.dbConnection);

    const lastStudent = await Student.findOne().sort({ _id: -1 });

    // Generate the new studentId
    const year = new Date().getFullYear();
    const newStudentId = lastStudent ? 
      `${year}/${(parseInt(lastStudent.studentId.split('/')[1]) + 1).toString().padStart(4, '0')}` :
      `${year}/0001`;

    // Create a new student record
    const newStudent = new Student({
      firstName,
      lastName,
      contactNumber,
      email,
      username,
      password,
      transactionId,
      studentId: newStudentId,
      status: 'Pending',
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
