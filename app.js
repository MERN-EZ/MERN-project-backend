import express from 'express';
import { connect } from './utils/database.connection.js';
import logger from './utils/logger.js';
import teacherLessonRoutes from './routes/teacher/lessonRoutes.js';
import studentHomeworkRoutes from './routes/student/homeworkRoutes.js';
import guestRegistrationRoutes from './routes/guest/registerRoutes.js';
import classRoutes from './routes/guest/classRoutes.js';

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
    logger.info('Received a preflight request!');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(async (req, res, next) => {
  logger.info(`---------------------------------`);
  logger.info(`Request Method: ${req.method}`);
  logger.info(`Request URL: ${req.url}`);
  const dbName = req.headers['db-name'] || '2024';
  if (dbName) {
    logger.info(`Request Headers: ${dbName}\n`);
  }
  req.dbConnection = await connect(dbName);
  next();
});

app.use("/teacher/lessons", teacherLessonRoutes);
app.use("/student/homeworks", studentHomeworkRoutes);
// app.use("/student/users", studentUserRoutes);
// app.use('/teacher/homework', teacherHomeworkRoutes);
app.use('/guest/register', guestRegistrationRoutes);
app.use('/guest/classes', classRoutes);

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// General error-handling middleware
app.use((err, req, res, next) => {
  logger.infoor(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect('2024').catch((error) => {
    logger.error(`Failed to connect to the default database: ${error.message}`);
  });
});
