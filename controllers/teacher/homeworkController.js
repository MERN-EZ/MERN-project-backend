import logger from '../../utils/logger.js';
import { getLessonModel } from '../../models/lessonModel.js';

export const addHomework = async (req, res) => {
  logger.info(req.body);
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    // Ensure reminders is an array of strings
    if (req.body.reminders && typeof req.body.reminders === 'object') {
      // req.body.reminders = Object.values(req.body.reminders);
    }
    console.log(lesson);
    console.log(req.body);
    console.log(req.body.reminders);
    console.log(lesson.homework.length);
    // Create a new homework object
    const highestLessonId = lesson.homework.reduce((maxId, homework) => {
      return homework.id > maxId ? homework.id : maxId;
    }, 0);

    const newHomework = {
      id: highestLessonId + 1,
      title: req.body.title,
      description: req.body.description,
      deadline: new Date(req.body.deadline.split('T')[0]),
      reminders: req.body.reminders || [],
    };

    // Add the new homework to the lesson
    lesson.homework.push(newHomework);

    await lesson.save();
    res.status(200).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHomework = async (req, res) => {
  logger.info('Deleting homework');
  const lessonId = req.params.lessonId;
  const homeworkId = req.params.homeworkId;
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      logger.info('Lesson not found');
      return res.status(404).json({ error: 'Lesson not found' });
    }
    const homeworkIndex = lesson.homework.findIndex(
      (homework) => homework.id === parseInt(homeworkId)
    );
    if (homeworkIndex === -1) {
      logger.info('Homework not found');
      return res.status(404).json({ error: 'Homework not found' });
    }
    lesson.homework.splice(homeworkIndex, 1);
    await lesson.save();
    logger.info('Homework deleted successfully');
    res.status(200).json(lesson);
  } catch (err) {
    logger.error('Error deleting homework:', err);
    res.status(400).json({ error: err.message });
  }
};

export const updateHomework = async (req, res) => {
  logger.info('Updating homework');
  const lessonId = req.params.lessonId;
  const homeworkId = req.params.homeworkId;
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      logger.info('Lesson not found');
      return res.status(404).json({ error: 'Lesson not found' });
    }
    const homeworkIndex = lesson.homework.findIndex(
      (homework) => homework.id === parseInt(homeworkId)
    );
    if (homeworkIndex === -1) {
      logger.info('Homework not found');
      return res.status(404).json({ error: 'Homework not found' });
    }
    const homework = lesson.homework[homeworkIndex];
    if (req.body.title) {
      homework.title = req.body.title;
    }
    if (req.body.description) {
      homework.description = req.body.description;
    }
    if (req.body.deadline) {
      homework.deadline = new Date(req.body.deadline.split('T')[0]);
    }
    if (req.body.reminders) {
      homework.reminders = req.body.reminders;
    }
    await lesson.save();
    logger.info('Homework updated successfully');
    res.status(200).json(lesson);
  } catch (err) {
    logger.error('Error updating homework:', err);
    res.status(400).json({ error: err.message });
  }
};
