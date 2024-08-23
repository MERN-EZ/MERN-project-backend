import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  ongoingLesson: { type: String, required: true },
  admissionFee: { type: Number, required: false },
  monthlyFee: { type: Number, required: false },
  year: { type: String, required: true },
});

const getClassModel = (dbConnection) =>
  dbConnection.model('Class', classSchema);

export { getClassModel };
