import { getStudentModel } from '../../models/studentModel.js';
//import bcrypt from 'bcryptjs';
import logger from '../../utils/logger.js';

export const loginStudent = async (req, res) => {
  logger.info('Login request received');
  const { username, password } = req.body;

  try {
    const Student = getStudentModel(req.dbConnection);
    const student = await Student.findOne({ username });
    logger.info();
    logger.info(`User ${username} found`);

    if (!student) {
      logger.error(`User ${username} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    //const isMatch = await bcrypt.compare(password, student.password);

    //if (!isMatch) {
    //return res.status(401).json({ message: 'Invalid credentials' });
    //}

    //const batch = await getBatchInfoForStudent(student.studentId, dbConnection);

    const userDetails = {
      firstName: student.firstName,
      lastName: student.lastName,
      username: student.username,
      email: student.email,
      contactNumber: student.contactNumber,
      batch: req['db-name'],
      studentId: student.studentId,
      registeredDate: student.registeredDate,
    };
    logger.info(
      `User ${username} logged in successfully. UserDetails: ${JSON.stringify(
        userDetails
      )}`
    );
    res.status(200).json(userDetails);
  } catch (error) {
    logger.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
