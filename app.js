import express from 'express';
import { connect } from './utils/database.connection.js';
import logger from './utils/logger.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import teacherLessonRoutes from './routes/teacher/lessonRoutes.js';
import teacherHomeworkRoutes from './routes/teacher/homeworkRoutes.js';
import teacherClassRoutes from './routes/teacher/classRoutes.js';
import teacherSubmissionRoutes from './routes/teacher/submissionRoutes.js';
import teacherFeedbackRoutes from './routes/teacher/feedBackRoutes.js';
import studentHomeworkRoutes from './routes/student/homeworkRoutes.js';
import guestRegistrationRoutes from './routes/guest/registerRoutes.js';
import classRoutes from './routes/guest/classRoutes.js';
import assistantUserRoutes from './routes/assistant/userRoutes.js';
import studentRoutes from './routes/student/studentRoutes.js';
import authRoutes from './routes/guest/authRoutes.js';
import adminAssistantRoutes from './routes/admin/assistantRoutes.js';
import supportRoutes from './routes/student/supportRoutes.js';
import { authenticateToken, authorizeRole } from './utils/authFunctions.js';
import studentHomeRoutes from './routes/student/homeRoutes.js';


const app = express();
const PORT = process.env.PORT || '8090';
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    credentials: true, // Allow credentials (cookies) to be sent/received
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,db-name,Authorization',
  })
);

app.use(async (req, res, next) => {
  logger.info(`---------------------------------`);
  logger.info(`Request Method: ${req.method}`);
  logger.info(`Request URL: ${req.url}`);
  logger.info(`Request Headers: ${JSON.stringify(req.headers['db-name'])}\n`);
  const dbName = req.headers['db-name'] || '2024';
  req.dbConnection = await connect(dbName);
  next();
});

app.use('/guest/register', guestRegistrationRoutes);
app.use('/guest/classes', classRoutes);
app.use('/guest/auth', authRoutes);

app.use('/student/homeworks', authenticateToken, authorizeRole('student'), studentHomeworkRoutes);
app.use('/student/class', authenticateToken, authorizeRole('student'), studentHomeRoutes);
app.use('/student/studentSupportPage', authenticateToken, authorizeRole('student'), supportRoutes);
app.use('/student', authenticateToken, authorizeRole('student'), studentRoutes);

//app.use('/student/users', studentRoutes);

app.use('/teacher/lessons', authenticateToken, authorizeRole('teacher'), teacherLessonRoutes);
app.use('/teacher/homework', authenticateToken, authorizeRole('teacher'), teacherHomeworkRoutes);
app.use('/teacher/class', authenticateToken, authorizeRole('teacher'), teacherClassRoutes);
app.use('/teacher/submissions', authenticateToken, authorizeRole('teacher'), teacherSubmissionRoutes);
app.use('/teacher/feedback', authenticateToken, authorizeRole('teacher'), teacherFeedbackRoutes);

app.use('/assistant/users', assistantUserRoutes);

// Admin - Assistant routes
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
  logger.info(`The Secret Key is: ${SECRET_KEY}`);
  connect('2024').catch((error) => {
    logger.error(`Failed to connect to the default database: ${error.message}`);
  });
});
