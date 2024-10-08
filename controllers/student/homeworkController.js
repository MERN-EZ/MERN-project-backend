import { getLessonModel } from '../../models/lessonModel.js';
import logger from '../../utils/logger.js';

export const getHomeWorks = async (req, res) => {
  logger.info('Getting all homework');

  try {
    const Lesson = getLessonModel(req.dbConnection);

    const result = await Lesson.aggregate([
      { $unwind: '$homework' },
      {
        $project: {
          _id: 1,
          title: 1,
          homework: {
            _id: 1,
            title: 1,
            description: 1,
            deadline: 1,
            reminders: 1,
            submissions: {
              studentId: 1,
              submissionText: 1,
              _id: 1,
              submissionDate: 1,
            },
          },
        },
      },
    ]);

    if (result.length === 0) {
      return res.json({ message: 'No homework found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching homework:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getHomeworkById = async (req, res) => {
  const homeworkId = req.params.id;
  logger.info(`Getting homework with ID: ${homeworkId}`);

  try {
    const Lesson = getLessonModel(req.dbConnection);

    const result = await Lesson.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          homework: {
            $cond: {
              if: { $isArray: '$homework' },
              then: '$homework',
              else: [],
            },
          },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).send('Homework not found');
    }

    const lesson = result[0];
    const homework = lesson.homework;

    res.json({
      lesson: {
        id: lesson._id,
        title: lesson.title,
        homework: lesson.homework,
      },
      homework: {
        id: homework._id,
        title: homework.title,
        description: homework.description,
        deadline: homework.deadline,
        reminders: homework.reminders,
      },
    });
  } catch (error) {
    console.error('Error fetching homework by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const addSubmission = async (req, res) => {
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findById(req.params.lessonId);
    console.log("body", req.body);

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const homeworkId = req.params.homeworkId;
    const homework = lesson.homework.find(
      (hw) => hw._id.toString() === homeworkId
    );

    if (!homework) {
      return res.status(404).json({ error: 'Homework not found' });
    }

    if (!homework.submissions) {
      homework.submissions = [];
    }

    homework.submissions.push(req.body);
    console.log(req.body);

    await lesson.save();

    res.status(200).json({ message: 'Submission added successfully', lesson });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSubmission = async (req, res) => {
  const { homeworkId, studentId } = req.params;
  const { submissionText, lessonId } = req.body;
  console.log('Updating submission:', homeworkId, studentId, submissionText);

  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findOne({ _id: lessonId });
    console.log('Lesson:', lesson);
    if (!lesson) {
      console.log('Lesson not found');
      return res.status(404).json({ error: 'Lesson not found' });
    }

    console.log('Homework ID:', homeworkId);
    const homework = lesson.homework.find((hw) => {
      return hw._id.toString() === homeworkId;
    }); 
    console.log('Homework:', homework);
    if (!homework) {
      console.log('Homework not found');
      return res.status(404).json({ error: 'Homework not found' });
    }

    const submission = homework.submissions.find(
      (sub) => sub.studentId.toString() === studentId
    );

    if (submission) {
      console.log('Submission found', submission);
      submission.submissionText = submissionText;
      await lesson.save(); 
      return res.json({
        success: true,
        message: 'Submission updated successfully',
      });
    } else {
      console.log('Submission not found');
      return res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error updating submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteSubmission = async (req, res) => {
  const { homeworkId, studentId } = req.params;

  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lesson = await Lesson.findOne({ 'homework._id': homeworkId });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const homework = lesson.homework.find((hw) => hw._id.toString() === homeworkId);

    if (!homework) {
      return res.status(404).json({ error: 'Homework not found' });
    }

    const submissionIndex = homework.submissions.findIndex(
      (sub) => sub.studentId.toString() === studentId
    );

    if (submissionIndex === -1) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    homework.submissions.splice(submissionIndex, 1);
    await lesson.save();

    return res.json({ message: 'Submission deleted successfully' });
    console.log('Submission deleted successfully');
  } catch (error) {
    console.error('Error deleting submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};