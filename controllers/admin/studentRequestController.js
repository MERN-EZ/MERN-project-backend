// To handle fetching student requests from the database
import { getStudentModel } from "../../models/studentModel.js";
import logger from '../../utils/logger.js';

// Fetch all student requests
export const getAllStudentRequests = async (req, res) => {
    logger.info('Fetching all student requests');
    try {
        const Student = getStudentModel(req.dbConnection);
        const requests = await  Student.find({ status: 'Pending' }); // Fetch only pending requests
        res.status(200).json(requests);
    } catch (err){
        logger.error('Error fetching student requests:', err);
        res.status(500).json({ error: err.message });
    }
}

// Accept a student request
export const acceptStudentRequest = async (req, res) => {
    try {
        const Student = getStudentModel(req.dbConnection);
        const request = await Student.findById(req.params.id); // Find the request by ID

        if (!request) {
            return res.status(404).json({ message: 'Request not found' }); // Handle not found
        }

        request.status = 'Approved'; // Update status to Approved
        await request.save(); // Save the updated request

        // Logic to create a student account goes here
        res.json({ message: 'Request accepted and student account created' }); // Success response
    } catch (err) {
        logger.error('Error accepting student request:', err);
        res.status(500).json({ message: err.message });
    }
};

// Reject a student request
export const rejectStudentRequest = async (req, res) => {
    try {
        const Student = getStudentModel(req.dbConnection);
        const request = await Student.findById(req.params.id); // Find the request by ID

        if (!request) {
            return res.status(404).json({ message: 'Request not found' }); // Handle not found
        }

        request.status = 'Rejected'; // Update status to Rejected
        await request.save();

        res.json({ message: 'Request rejected' }); // Success response
    } catch (err) {
        logger.error('Error rejecting student request:', err);
        res.status(500).json({ message: err.message }); // Handle errors
    }
};