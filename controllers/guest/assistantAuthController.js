import { getAssistantModel } from '../../models/assistantModel.js';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger.js';
import { generateToken } from '../../utils/authFunctions.js';

export const loginAssistant = async (req, res) => {
  logger.info('Login request received');
  const { username, password, year } = req.body;

  try {
    const Assistant = getAssistantModel(req.dbConnection);
    const assistant = await Assistant.findOne({ username });
    logger.info();

    if (!assistant) {
      logger.error(`User ${username} not found in the year ${year}`);
      return res.status(404).json({ message: 'User not found' });
    }
    logger.info(`User ${username} found`);

    const isMatch = await bcrypt.compare(password, assistant.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //const batch = await getBatchInfoForAssistant(assistant.assistantId, dbConnection);

    /* if (year !== assistant.assistantId.split('_')[0]) {
      return res.status(400).json({ message: 'Incorrect year for this user' });
    } */

    const userDetails = {
      firstName: assistant.firstName,
      lastName: assistant.lastName,
      username: assistant.username,
      email: assistant.email,
      phoneNumber: assistant.phoneNumber,
      batch: year,
      assistantId: assistant.assistantId,
    };
    logger.info(`User ${username} logged in successfully. UserDetails: ${JSON.stringify(userDetails)}`);

    // Validate user credentials
    const user = { username: assistant.username, role: 'assistant' };
    logger.info(`User ${username} validated`);
    const token = generateToken(user);
    logger.info(`Token generated for user ${username}`);

    res.status(200).json({ userDetails, token });
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
