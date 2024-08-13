import { getLessonModel } from "../../models/lessonModel.js";
import logger from "../../utils/logger.js";

export const getHomeWorks = async (req, res) => {
    logger.info("Getting all hoe works");
    try {
        // Fetch the last 3 lessons
        const lessons = await Lesson.find().sort({ id: -1 }).limit(3);
        
        // Extract homework from these lessons
        const homeworkArray = lessons.flatMap(lesson => lesson.homework);
        
        res.json(homeworkArray);
      } catch (error) {
        console.error('Error fetching homework:', error);
        res.status(500).send('Internal Server Error');
      }
    }