import { getLessonModel } from "../../models/lessonModel.js";
import logger from "../../utils/logger.js";

export const getHomeWorks = async (req, res) => {
    logger.info("Getting all homework");

    try {
        const Lesson = getLessonModel(req.dbConnection);

        // Aggregate to find all homework items with their associated lesson details
        const result = await Lesson.aggregate([
            { $unwind: "$homework" },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    homework: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        deadline: 1,
                        reminders: 1
                    }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).send('No homework found');
        }

        // Send the aggregated homework data
        res.json(result);
    } catch (error) {
        console.error('Error fetching homework:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const getHomeworkById = async (req, res) => {
    const homeworkId = req.params.id;
    logger.info(`Getting homework with ID: ${homeworkId}`);

    try {
        const Lesson = getLessonModel(req.dbConnection);

        // Use aggregation to find the homework and its lesson in one query
        const result = await Lesson.aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    homework: {
                        $cond: {
                            if: { $isArray: "$homework" },
                            then: "$homework",
                            else: []
                        }
                    }
                }
            }
        ]);
        

        if (result.length === 0) {
            return res.status(404).send('Homework not found');
        }

        // Return the lesson and homework details
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
            }
        });
    } catch (error) {
        console.error('Error fetching homework by ID:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const addSubmission = async (req, res) => {
    logger.info("Adding submission to homework");
    try {
      const Lesson = getLessonModel(req.dbConnection);
      const lesson = await Lesson.findById(req.params.lessonId);
  
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
  
      // Initialize submissions array if it doesn't exist
      if (!homework.submissions) {
        homework.submissions = [];
      }
  
      // Add the new submission to the homework's submissions array
      homework.submissions.push(req.body);
  
      // Save the updated lesson
      await lesson.save();
  
      res.status(200).json({ message: 'Submission added successfully', lesson });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };