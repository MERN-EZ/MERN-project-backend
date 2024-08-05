import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the Homework schema
const homeworkSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  reminders: { type: [String], required: true },
});

// Define the Lesson schema
const lessonSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  homeworks: { type: [homeworkSchema], required: true },
});

// Create the Lesson model
const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
