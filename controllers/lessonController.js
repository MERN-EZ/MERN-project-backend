import Lesson from "../models/lessonModel.js";
import logger from "../utils/logger.js";

// Create a new lesson
export const createLesson = async (req, res) => {
  logger.info("Creating a new lesson");
  logger.info(req.body);
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all lessons
export const getAllLessons = async (req, res) => {
  logger.info("Getting all lessons");
  try {
    const lessons = await Lesson.find();

    // console.log(lessons);
    const modifiedLessons = lessons.map((lesson) => {
      const modifiedHomework = lesson.homework.map((homework) => {
        const deadline = homework.deadline.toISOString().split("T")[0];
        homework.reminders = homework.reminders[0].split(",");
        const reminders = [];
        if (homework.reminders[0] === "true") {
          reminders.push("2 day");
        }
        if (homework.reminders[1] === "true") {
          reminders.push("1 day");
        }
        if (homework.reminders[2] === "true") {
          reminders.push("3 hours");
        }
        return {
          ...homework._doc,
          reminders: reminders.join(", "),
          deadline: deadline,
        };
      });
      return {
        ...lesson._doc,
        homework: modifiedHomework,
      };
    });
    // console.log(modifiedLessons[0].homework[0]);
    res.status(200).json(modifiedLessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a lesson by ID
// export const getLessonById = async (req, res) => {
//   try {
//     const lesson = await Lesson.findById(req.params.id);
//     if (!lesson) {
//       return res.status(404).json({ error: "Lesson not found" });
//     }
//     res.status(200).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update a lesson by ID
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateHomework = async (req, res) => {
  console.log(req.body);
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    // Ensure reminders is an array of strings
    if (req.body.reminders && typeof req.body.reminders === "object") {
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
      deadline: new Date(req.body.deadline.split("T")[0]),
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
  logger.info("Deleting a lesson");
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    const remainingLessons = await Lesson.find();
    res.status(200).json(remainingLessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
