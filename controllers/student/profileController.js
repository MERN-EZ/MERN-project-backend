import { getStudentModel } from '../../models/studentModel.js';
import logger from '../../utils/logger.js';

//export const getStudentById = async (req, res) => {
//const { id } = req.params;
//logger.info(`Getting student with studentId: ${id}`);

//try {
//const StudentModel = getStudentModel(req.dbConnection);

//const student = await StudentModel.findOne({ studentId: id });

//if (!student) {
//return res.status(404).json({ message: 'Student not found' })
//}

//res.json(student);
//} catch (error) {
//logger.error('Error fetching student by studentId', error);
//res.status(500).json({ message: 'Internal Server Error' });
//}
//};

export const updateStudentProfile = async (req, res) => {
  const { studentId, ...updateData } = req.body; // Extract studentId and updateData
  logger.info(`Updating student profile with studentId: ${studentId}`);

  try {
    const StudentModel = getStudentModel(req.dbConnection);

    const student = await StudentModel.findOneAndUpdate(
      { studentId },
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the data before saving
      }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    logger.error('Error updating student profile', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteStudentProfile = async (req, res) => {
  const { studentId } = req.query; // Get studentId from request user context or header
  logger.info(`Deleting student with studentId: ${studentId}`);

  try {
    const StudentModel = getStudentModel(req.dbConnection);

    const result = await StudentModel.findOneAndDelete({ studentId });

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student profile deleted successfully' });
  } catch (error) {
    logger.error('Error deleting student profile', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
