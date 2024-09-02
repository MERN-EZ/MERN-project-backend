import { getUserModel } from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger.js';
import { generateToken } from '../../utils/authFunctions.js';

export const loginStaff = async (req, res) => {
  logger.info('Login request received');
  const { username, password, role, year } = req.body;

  try {
    const Staff = getUserModel(req.dbConnection);
    const staff = await Staff.findOne({ username, role });
    logger.info();

    if (!staff) {
      logger.error(`User ${username} not found in the year ${year}`);
      return res.status(404).json({ message: 'User not found' });
    }
    logger.info(`User ${username} found`);

    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate user credentials
    const user = { username: staff.username, role: staff.role };
    logger.info(`User ${username} validated`);
    const token = generateToken(user);
    logger.info(`Token generated for user ${username}`);

    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const registerStaff = async (req, res) => {
  logger.info('Register request received');
  const { username, password, role } = req.body;
  console.log(req.body);

  try {
    const Staff = getUserModel(req.dbConnection);
    const staff = await Staff.findOne({ username });

    if (staff) {
      logger.error(`User ${username} already exists`);
      return res.status(409).json({ message: 'User already exists' });
    }

    let newStaffId;
    if (role === 'admin') {
      const lastAdmin = await Staff.findOne({ role: 'admin' }).sort({ _id: -1 });
      console.log(lastAdmin);
      const numberA = lastAdmin ? parseInt(lastAdmin.id.split('_')[1]) + 1 : 1;
      console.log(numberA);
      newStaffId = `admin_${numberA.toString().padStart(2, '0')}`;
    } else {
      const lastTeacher = await Staff.findOne({ role: 'teacher' }).sort({ _id: -1 });
      console.log(lastTeacher);
      const TeacherLast = lastTeacher.id.split('_')[1];
      console.log(TeacherLast);
      const numberT = lastTeacher ? parseInt(TeacherLast) + 1 : 1;
      console.log(numberT);
      newStaffId = `teacher_${numberT.toString().padStart(2, '0')}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ id: newStaffId, username, password: hashedPassword, role });
    await newStaff.save();

    logger.info(`User ${username} registered successfully`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error during registration: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
