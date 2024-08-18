import { getStudentModel } from "../../models/studentModel.js"; // Import the student model
import logger from "../../utils/logger.js";

export const getStudentById = async (req, res) => {
    logger.info(`Getting student with ID: ${req.params.id}`);
    try {
        const StudentModel = getStudentModel(req.dbConnection); // Use the student model
        const student = await StudentModel.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        logger.error('Error fetching student by ID', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
