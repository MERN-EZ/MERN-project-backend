import { getAttendanceModel } from '../../models/attendanceModel.js';
import { getStudentModel } from '../../models/studentModel.js';
import logger from '../../utils/logger.js';

export const getAllStudentDetails = async (req, res) => {
  logger.info('Getting all student details');
  try {
    const Attendance = getAttendanceModel(req.dbConnection);
    const Student = getStudentModel(req.dbConnection);
    // console.log(Attendance);
    // console.log(Student);
    logger.info('Hii you are here');

    // Fetch student details from the Student collection
    const students = await Student.find({}, 'studentId firstName lastName');
    logger.info(students);

    // Map student data with their attendance records
    const studentDetails = await Promise.all(
      students.map(async (student) => {
        const attendanceRecord = await Attendance.findOne({
          studentId: student.studentId,
        });
        return {
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          attendance: attendanceRecord ? attendanceRecord.attendance : null,
        };
      })
    );

    // logger.info(studentDetails);
    // res.status(200).json(studentDetails);
    res.status(200).json({ success: 'message' });
  } catch (err) {
    logger.error('Error getting student details:', err);
    res.status(400).json({ error: err.message });
  }
};
