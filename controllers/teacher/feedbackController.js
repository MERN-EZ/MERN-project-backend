import { getSupportMessageModel } from '../../models/SupportMessage.js';
import logger from '../../utils/logger.js';

export const getMessages = async (req, res) => {
  try {
    logger.info('Getting all support messages from the database.');
    const SupportMessage = getSupportMessageModel(req.dbConnection);

    const messages = await SupportMessage.find();

    logger.info(`Retrieved ${messages.length} support messages from the database.`);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error gettings message:', error); // Log the error to the console
    res.status(500).json({ message: 'Failed to get message. Please try again later.' });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    logger.info('Deleting a support message from the database.');
    const SupportMessage = getSupportMessageModel(req.dbConnection);

    const { id } = req.params;
    const message = await SupportMessage.findByIdAndDelete(id);

    if (message) {
      logger.info(`Deleted support message with ID ${id}.`);
      res.status(200).json({ message: 'Message deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Message not found.' });
    }
  } catch (error) {
    console.error('Error deleting message:', error); // Log the error to the console
    res.status(500).json({ message: 'Failed to delete message. Please try again later.' });
  }
};
