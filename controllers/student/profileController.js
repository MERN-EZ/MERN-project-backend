import { getStudentModel } from "../../models/studentModel.js"; 
import logger from "../../utils/logger.js";

export const getStudentById = async (req, res) => {
    const { id } = req.params; 
    logger.info(`Getting student with studentId: ${id}`);
    
    try {
        const StudentModel = getStudentModel(req.dbConnection);
        
        const student = await StudentModel.findOne({ studentId: id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }

        res.json(student);
    } catch (error) {
        logger.error('Error fetching student by studentId', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
