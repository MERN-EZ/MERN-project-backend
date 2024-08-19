import { getStudentModel } from "../../models/studentModel.js";
//import bcrypt from 'bcryptjs';
import logger from '../../utils/logger.js';

export const loginStudent = async (req, res) => {
  const { username, password } = req.body;
  const { dbConnection } = req;

  try {
    const Student = getStudentModel(dbConnection);
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const batch = await getBatchInfoForStudent(student.studentId, dbConnection);

    const userDetails = {
      username: student.username,
      email: student.email,
      contactNo: student.contactNo,
      batch: batch,
      studentId: student.studentId,
    };

    logger.info(`User ${username} logged in successfully.`);
    res.status(200).json(userDetails);
  } catch (error) {
    logger.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
