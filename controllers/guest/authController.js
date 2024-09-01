import { getStudentModel } from '../../models/studentModel.js';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger.js';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
}

export const loginStudent = async (req, res) => {
  logger.info('Login request received');
  const { username, password, year } = req.body;

  try {
    const Student = getStudentModel(req.dbConnection);
    const student = await Student.findOne({ username });
    logger.info();

    if (!student) {
      logger.error(`User ${username} not found in the year ${year}`);
      return res.status(404).json({ message: 'User not found' });
    }
    logger.info(`User ${username} found`);

    if (student.status !== 'Approved') {
      logger.error(`User ${username} has status: ${student.status}`);
      return res.status(403).json({ message: `Account is ${student.status}` });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //const batch = await getBatchInfoForStudent(student.studentId, dbConnection);

    /* if (year !== student.studentId.split('_')[0]) {
      return res.status(400).json({ message: 'Incorrect year for this user' });
    } */

    const userDetails = {
      firstName: student.firstName,
      lastName: student.lastName,
      username: student.username,
      email: student.email,
      contactNumber: student.contactNumber,
      batch: year,
      studentId: student.studentId,
      registeredDate: student.registeredDate,
    };
    logger.info(`User ${username} logged in successfully. UserDetails: ${JSON.stringify(userDetails)}`);

    // Validate user credentials
    const user = { username: student.username, role: 'student' };
    logger.info(`User ${username} validated`);
    const token = generateToken(user);
    logger.info(`Token generated for user ${username}`);

    res.status(200).json({ userDetails, token });
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
