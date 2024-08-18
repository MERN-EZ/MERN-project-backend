// To handle fetching student requests from the database
import { getStudentRequestModel } from "../../models/studentRequestModel";
import logger from '../utils/logger.js';

// Fetch all student requests
export const getAllStudentRequests = async (req, res) => {
    logger.info('Fetching all student requests');
    try {
        const StudentRequest = getStudentRequestModel(req.dbConnection);
        const request = await  StudentRequest.find({ status: 'pending' }); // Fetch only pending requests
        res.status(200).json(requests);
    } catch (err){
        logger.error('Error fetching student requests:', err);
        res.status(500).json({ error: err.message });
    }
}

// Accept a student request
export const acceptStudentRequest = async (req, res) => {
    try {
        const StudentRequest = getStudentRequestModel(req.dbConnection);
        const request = await StudentRequest.findById(req.params.id); // Find the request by ID

        if (!request) {
            return res.status(404).json({ message: 'Request not found' }); // Handle not found
        }

        request.status = 'accepted'; // Update status to accepted
        await request.save(); // Save the updated request

        // Logic to create a student account goes here

        res.json({ message: 'Request accepted and student account created' }); // Success response
    } catch (err) {
        logger.error('Error accepting student request:', err);
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

// Reject a student request
export const rejectStudentRequest = async (req, res) => {
    try {
        const StudentRequest = getStudentRequestModel(req.dbConnection);
        const request = await StudentRequest.findById(req.params.id); // Find the request by ID

        if (!request) {
            return res.status(404).json({ message: 'Request not found' }); // Handle not found
        }

        request.status = 'rejected'; // Update status to rejected
        await request.save(); // Save the updated request

        res.json({ message: 'Request rejected' }); // Success response
    } catch (err) {
        logger.error('Error rejecting student request:', err);
        res.status(500).json({ message: err.message }); // Handle errors
    }
};