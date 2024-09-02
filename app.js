import express from 'express';
import { connect } from './utils/database.connection.js';
import logger from './utils/logger.js';
import teacherLessonRoutes from './routes/teacher/lessonRoutes.js';
import teacherHomeworkRoutes from './routes/teacher/homeworkRoutes.js';
import teacherClassRoutes from './routes/teacher/classRoutes.js';
import studentHomeworkRoutes from './routes/student/homeworkRoutes.js';
import guestRegistrationRoutes from './routes/guest/registerRoutes.js';
import classRoutes from './routes/guest/classRoutes.js';
import assistantUserRoutes from './routes/assistant/userRoutes.js';
import studentRoutes from './routes/student/studentRoutes.js';
import authRoutes from './routes/guest/authRoutes.js';
import adminAssistantRoutes from './routes/admin/assistantRoutes.js';
import teacherSubmissionRoutes from './routes/teacher/submissionRoutes.js';

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
    console.log('Received a preflight request!');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(async (req, res, next) => {
  logger.info(`---------------------------------`);
  logger.info(`Request Method: ${req.method}`);
  logger.info(`Request URL: ${req.url}`);
  logger.info(`Request Headers: ${JSON.stringify(req.headers['db-name'])}\n`);
  const dbName = req.headers['db-name'] || '2024';
  req.dbConnection = await connect(dbName);
  next();
});

// Routes
app.use('/student/homeworks', studentHomeworkRoutes);
app.use('/student', studentRoutes);
//app.use('/student/users', studentRoutes);

app.use('/teacher/lessons', teacherLessonRoutes);
app.use('/teacher/homework', teacherHomeworkRoutes);
app.use('/teacher/class', teacherClassRoutes);
app.use('/teacher/submissions', teacherSubmissionRoutes);

app.use('/guest/register', guestRegistrationRoutes);
app.use('/guest/classes', classRoutes);
app.use('/guest/auth', authRoutes);

app.use('/assistant/users', assistantUserRoutes);

// Admin - Assistant routes
// app.use('/admin/assistants', authenticateToken, authorizeRole('admin'), adminAssistantRoutes);
app.use('/admin/assistants', adminAssistantRoutes);

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// General error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect('2024').catch((error) => {
    logger.error(`Failed to connect to the default database: ${error.message}`);
  });
});
