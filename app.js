import express from 'express';
import { connect } from './utils/database.connection.js';
import logger from './utils/logger.js';
import teacherLessonRoutes from './routes/teacher/lessonRoutes.js';
import studentHomeworkRoutes from './routes/student/homeworkRoutes.js';

const app = express();
const PORT = process.env.PORT || '8090';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, db-name'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    logger.trace('Received a preflight request!');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(async (req, res, next) => {
  logger.debug(`Request Method: ${req.method}`);
  logger.debug(`Request URL: ${req.url}`);
  logger.debug(`Request Headers: ${JSON.stringify(req.headers['db-name'])}`);
  const dbName = req.headers['db-name'] || '2024';
  req.dbConnection = await connect(dbName);
  next();
});

app.use('/teacher/lessons', teacherLessonRoutes);
app.use('/student/homeworks', studentHomeworkRoutes);

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// General error-handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect('2024').catch((error) => {
    logger.error(`Failed to connect to the default database: ${error.message}`);
  });
});
