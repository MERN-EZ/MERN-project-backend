import { getStudentModel } from '../../models/studentModel.js';
//import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';
import bcrypt from 'bcryptjs';

export const registerStudent = async (req, res) => {
  const { firstName, lastName, contactNumber, email, username, password, transactionId } = req.body;

  const db = req.headers['db-name'];

  try {
    logger.info(`Db received: ${db}`);

    const Student = getStudentModel(req.dbConnection);

    const existingStudent = await Student.findOne({
      $or: [{ username }, { email }],
    });

    if (existingStudent) {
      if (existingStudent.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingStudent.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const lastStudent = await Student.findOne().sort({ _id: -1 });
    logger.info(`last student: ${lastStudent}`);
    const year = db;
    const newStudentId = lastStudent
      ? `${year}_${(parseInt(lastStudent.studentId.split('_')[1]) + 1).toString().padStart(4, '0')}`
      : `${year}_0001`;

    const hashedPassword = await bcrypt.hash(password, 10);

    logger.info(`New student id: ${newStudentId}`);

    const newStudent = new Student({
      firstName,
      lastName,
      contactNumber,
      email,
      username,
      password: hashedPassword,
      transactionId,
      studentId: newStudentId,
      status: 'Pending',
    });

    await newStudent.save();

    /* const Attendance = getAttendanceModel(req.dbConnection);
    const newAttendance = new Attendance({
      studentId: newStudentId,
      firstName,
      lastName,
      attendance: {},
    });
    await newAttendance.save(); */

    logger.info(`New student registered: ${username}`);
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    console.log('Error during student registration:', {
      message: error.message,
      stack: error.stack,
      dbName: db,
      body: req.body,
    });

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === 'username') {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (field === 'email') {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};
