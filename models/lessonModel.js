import mongoose from 'mongoose';

const { Schema } = mongoose;

const submissionSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  submissionText: {
    type: String,
    required: true,
  },
});

const homeworkSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  reminders: {
    type: [String],
    required: false,
  },
  submissions: [submissionSchema],
});

const lessonSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  homework: { type: [homeworkSchema], required: false },
});

export const getLessonModel = (connection) => {
  return connection.model('Lesson', lessonSchema);
};
