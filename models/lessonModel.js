import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the Homework schema
const homeworkSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  reminders: { type: [String], required: false },
});
// Pre-save hook to ensure only the date part is saved
// homeworkSchema.pre("save", function (next) {
//   if (this.deadline) {
//     this.deadline = new Date(this.deadline.toISOString().split("T")[0]);
//   }
//   next();
// });

// Define the Lesson schema
const lessonSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  homework: { type: [homeworkSchema], required: false },
});

// Create the Lesson model
// const Lesson = mongoose.model("Lesson", lessonSchema);
// export default Lesson;
export const getLessonModel = (connection) => {
  return connection.model("Lesson", lessonSchema);
};
