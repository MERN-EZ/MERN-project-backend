import express from 'express';
import { registerStudent } from '../../controllers/guest/registrationController.js';

const router = express.Router();

// Log incoming requests to this route
router.use((req, res, next) => {
  logger.info('POST /guest/register/ route middleware');
  logger.info('Request body:', { body: req.body });
  next();
});

// Route handler
router.post('/', async (req, res) => {
  logger.info('POST /guest/register/ route handler');
  try {
    await registerStudent(req, res);
  } catch (error) {
    logger.error('Error in route handler:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
