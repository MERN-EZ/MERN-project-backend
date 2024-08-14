import { getLessonModel } from '../../models/lessonModel.js'; // Adjust the import path as needed
import logger from '../../utils/logger.js';

// Create a new lesson
export const createLesson = async (req, res) => {
  logger.info('Creating a new lesson');
  // logger.info(req.body);
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = new Lesson(req.body);
    await lesson.save();
    logger.info('Lesson created successfully');
    res.status(201).json(lesson);
  } catch (err) {
    logger.error('Error creating lesson:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all lessons
export const getAllLessons = async (req, res) => {
  logger.info('Getting all lessons');
  try {
    // Get the Lesson model for this specific connection
    const Lesson = getLessonModel(req.dbConnection);

    const lessons = await Lesson.find();

    const modifiedLessons = lessons.map((lesson) => {
      const modifiedHomework = lesson.homework.map((homework) => {
        const deadline = homework.deadline.toISOString().split('T')[0];
        let reminders = homework.reminders || [];
        const reminderLabels = reminders
          .map((reminder, index) => {
            if (reminder === 'true') {
              return ['2 day', '1 day', '3 hours'][index];
            }
            return null;
          })
          .filter(Boolean);

        return {
          ...homework.toObject(),
          reminders: reminderLabels.join(', '),
          deadline: deadline,
        };
      });

      return {
        ...lesson.toObject(),
        homework: modifiedHomework,
      };
    });

    res.status(200).json(modifiedLessons);
  } catch (err) {
    logger.error('Error processing lessons:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update a lesson by ID
export const updateLesson = async (req, res) => {
  logger.info('Updating a lesson');
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { $set: { id: req.body.id, title: req.body.title } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    logger.info('Lesson updated successfully');
    res.status(200).json(lesson);
  } catch (err) {
    logger.error('Error updating lesson:', err);
    res.status(400).json({ error: err.message });
  }
};

export const updateHomework = async (req, res) => {
  console.log(req.body);
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findById(req.params.id);
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
    const newHomework = {
      id: lesson.homework.length + 1, // Assuming id is sequential
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

// Delete a lesson by ID
export const deleteLesson = async (req, res) => {
  logger.info('Deleting a lesson');
  try {
    const Lesson = getLessonModel(req.dbConnection);
    // console.log(req.params.id);
    // console.log(await Lesson.find());
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    // res.status(200).json({ message: "Lesson deleted successfully" });
    const remainingLessons = await Lesson.find();
    // console.log(remainingLessons);
    res.status(200).json(remainingLessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
