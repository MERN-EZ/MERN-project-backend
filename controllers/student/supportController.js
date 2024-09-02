import { getSupportMessageModel } from '../../models/SupportMessage.js';
import logger from '../../utils/logger.js';

export const sendMessage = async (req, res) => {
  try {
    const SupportMessage = getSupportMessageModel(req.dbConnection);

    const { studentId, name, email, message, batch } = req.body;
    console.log('BodyDetails', req.body);
    console.log('StudentId', studentId);
    logger.info(`Received support message from student ${studentId}`);

    const newMessage = new SupportMessage({
      studentId,
      name,
      email,
      message,
    });

    console.log('NewMessage', newMessage);

    await newMessage.save();

    const savedMessage = await SupportMessage.findById(newMessage._id);
    console.log('SavedMessage', savedMessage);

    if (savedMessage) {
      logger.info(`Support message from student ${studentId} saved successfully.`);
      res.status(201).json({ message: 'Your message has been sent successfully.' });
    } else {
      throw new Error('Message not saved in the database.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
