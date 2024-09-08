import { getLessonModel } from '../../models/lessonModel.js';
import logger from '../../utils/logger.js';

export const getSubmissions = async (req, res) => {
  logger.info('Getting submissions for a specific lesson and homework');
  try {
    const Lesson = getLessonModel(req.dbConnection);
    const lessonId = req.params.lessonId;
    const homeworkId = req.params.homeworkId;
    console.log(lessonId, homeworkId);
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const homeworkItem = lesson.homework.find((hw) => {
      console.log(hw.id.toString(), homeworkId);
      return hw.id.toString() === homeworkId;
    });
    if (!homeworkItem) {
      return res.status(404).json({ error: 'Homework not found' });
    }
    console.log(homeworkItem);
    const submissions = homeworkItem.submissions;
    console.log(submissions);
    res.status(200).json(submissions);
  } catch (err) {
    logger.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
