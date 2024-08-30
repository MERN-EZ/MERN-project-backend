import { SupportMessage } from '../../models/SupportMessage.js';
import logger from '../../utils/logger.js';

export const sendMessage = async (req, res) => {
  try {
    const { studentId, name, email, message, batch } = req.body;

    // Logging the request details
    logger.info(`Received support message from student ${studentId}`);

    const newMessage = new SupportMessage({
      studentId,
      name,
      email,
      message,
      batch,
    });

    await newMessage.save();

    logger.info(
      `Support message from student ${studentId} saved successfully.`
    );

    res
      .status(201)
      .json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    logger.error('Error sending message:', error);
    res
      .status(500)
      .json({ message: 'Failed to send message. Please try again later.' });
  }
};
