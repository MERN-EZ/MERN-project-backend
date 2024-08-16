import { getAttendanceModel } from '../../models/attendanceModel.js';

export const getAllnames = async (req, res) => {
  logger.info('Getting all names');
  // try {
  //   const Attendance = getAttendanceModel(req.dbConnection);
  //   const names = await Attendance.find();

  //   logger.info(names);
  // } catch (err) {}

  res.status(200).json([]);
};
