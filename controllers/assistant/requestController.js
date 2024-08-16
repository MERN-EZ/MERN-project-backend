import { getAttendanceModel } from '../../models/attendanceModel.js';
import logger from '../../utils/logger.js';

export const getAllnames = async (req, res) => {
  logger.info('Getting all names');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const names = await Attendance.find();

    logger.info(names);
    res.status(200).json(names);
  } catch (err) {
    logger.error('Error getting names:', err);
    res.status(400).json({ error: err.message });
  }
};
