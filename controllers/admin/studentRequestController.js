// Controller functions to manage student requests: fetching, accepting, and rejecting
import { getStudentModel } from '../../models/studentModel.js';
import logger from '../../utils/logger.js';

// Fetch all student requests with status 'Pending'
export const getAllStudentRequests = async (req, res) => {
  logger.info('Fetching all student requests');
  try {
    const Student = getStudentModel(req.dbConnection); // Get the student model based on the current database connection
    const requests = await Student.find({ status: 'Pending' }); // Fetch only "Pending" requests
    res.status(200).json(requests);
  } catch (err) {
    logger.error('Error fetching student requests:', err);
    res.status(500).json({ error: err.message }); // Handle internal server errors with the error message
  }
};

// Accept a student request
export const acceptStudentRequest = async (req, res) => {
  console.log('Incoming request to accept student:', req.params.id);
  console.log('Request body:', req.body);

  const studentId = req.params.id; // Extract student ID from the request URL
  try {
    const Student = getStudentModel(req.dbConnection);
    const request = await Student.findOne({ studentId }); // Find the student request by studentId

    console.log('Student request found:', request);

    if (!request) {
      // Handle case where request is not found
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'Approved'; // Update the request status to 'Approved'
    console.log('Updated request status:', request.status);
    await request.save(); // Save the updated request to the database

    res.json({
      message: 'Request accepted and student account created',
      studentId: studentId,
    });
  } catch (err) {
    logger.error('Error accepting student request:', err);
    res.status(500).json({ message: err.message }); // Handle internal server error response with the error message
  }
};

// Reject a student request
export const rejectStudentRequest = async (req, res) => {
  const studentId = req.params.id; // Extract student ID from request URL
  try {
    const Student = getStudentModel(req.dbConnection);
    const request = await Student.findOne({ studentId }); // Find the student request by studentId

    if (!request) {
      return res.status(404).json({ message: 'Request not found' }); // Handle not found
    }

    request.status = 'Rejected'; // Update the request status to 'Rejected'
    await request.save(); // Save the updated request to the database

    res.json({
      message: 'Request rejected and student account not created',
      studentId: studentId,
    });
  } catch (err) {
    logger.error('Error rejecting student request:', err);
    res.status(500).json({ message: err.message });
  }
};
