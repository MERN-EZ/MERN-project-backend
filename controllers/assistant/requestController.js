import { getAttendanceModel } from '../../models/attendanceModel.js';
import { getStudentModel } from '../../models/studentModel.js';
import logger from '../../utils/logger.js';

export const getAllStudentDetails = async (req, res) => {
  logger.info('Getting all student details');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const Student = getStudentModel(req.dbConnection);

    const students = await Student.find(
      {},
      'studentId firstName lastName year'
    );

    const studentDetails = await Promise.all(
      students.map(async (student) => {
        const attendanceRecord = await Attendance.findOne({
          studentId: student.studentId,
        });
        return {
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          year: student.year,
          attendance: attendanceRecord
            ? attendanceRecord.attendance.get('date') === 'Present'
            : false,
        };
      })
    );

    res.status(200).json(studentDetails);
  } catch (err) {
    logger.error('Error getting student details:', err);
    res.status(400).json({ error: err.message });
  }
};
