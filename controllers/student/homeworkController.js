import { getLessonModel } from "../../models/lessonModel.js";
import logger from "../../utils/logger.js";

export const getHomeWorks = async (req, res) => {
    logger.info("Getting all home works");
    try {
        // Fetch the last 3 lessons
        const Lesson = getLessonModel(req.dbConnection);
        const lessons = await Lesson.find().sort({ id: -1 }).limit(20);
        
        // Extract homework from these lessons
        const homeworkArray = lessons.flatMap(lesson => lesson.homework);
        
        res.json(homeworkArray);
      } catch (error) {
        console.error('Error fetching homework:', error);
        res.status(500).send('Internal Server Error');
      }
    }

  export const getHomeworkById = async (req, res) => {
      const homeworkId = req.params.id;
      logger.info(`Getting homework with ID: ${homeworkId}`);
  
      try {
          // Fetch the lesson that contains the specified homework ID
          const Lesson = getLessonModel(req.dbConnection);
          const lessons = await Lesson.find({ "homework._id": homeworkId });
  
          if (!lessons.length) {
              return res.status(404).send('Homework not found');
          }
  
          // Find the specific homework item within the lessons
          const homework = lessons.flatMap(lesson => lesson.homework)
                                  .find(hw => hw._id.toString() === homeworkId);
  
          if (!homework) {
              return res.status(404).send('Homework not found');
          }
  
          res.json(homework);
      } catch (error) {
          console.error('Error fetching homework by ID:', error);
          res.status(500).send('Internal Server Error');
      }

  }
  