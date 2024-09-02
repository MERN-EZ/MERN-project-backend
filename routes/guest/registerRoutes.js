import express from 'express';
import { registerStudent } from '../../controllers/guest/registrationController.js';
import logger from '../../utils/logger.js';

const router = express.Router();

router.use((req, res, next) => {
  logger.info('POST /guest/register route middleware');
  logger.info('Request headers:', { headers: req.headers });
  logger.info('Request body:', { body: req.body });
  next();
});

router.post('/', async (req, res) => {
  logger.info('POST /guest/register route handler');
  try {
    await registerStudent(req, res);
  } catch (error) {
    logger.error('Error in route handler:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).send('Internal Server Error');
  }
});

export default router;
