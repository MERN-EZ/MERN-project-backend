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
    logger.info(req.body);
    try {
        const Lesson = getLessonModel(req.dbConnection); // Get the Lesson model
        const lesson = await Lesson.findById(req.params.lessonId); // Find the lesson by ID
        logger.info(lesson);

        
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Find the specific homework item
        // const homework = lesson.homework.id(req.params.homeworkId);
        const homeworkId = req.params.homeworkId;
        logger.info(homeworkId);
        const homeworkItem = lesson.homework.find(item => {
            logger.info("Homeworkitem" , item);
            item.id === homeworkId;
        });
        logger.info("Homeworkitem" , homeworkItem);

        if (!homeworkItem) {
            return res.status(404).json({ error: 'Homework not found' });
        }

        // Rest of the code...
        
        if (!homework) {
            return res.status(404).json({ error: 'Homework not found' });
        }

        const { studentId, submissionText } = req.body;

        if (!studentId || !submissionText) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new submission object
        const newSubmission = {
            studentId,
            submissionText,
            submissionDate: new Date(),
        };

        // Add the new submission to the homework
        homework.submissions.push(newSubmission);

        await lesson.save(); // Save the updated lesson
        res.status(200).json(homework);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
