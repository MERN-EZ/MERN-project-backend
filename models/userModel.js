import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  password: { type: String, required: true },
  username: { type: String, required: true, unqiue: true },
  role: { type: String, required: true },
});

export const getUserModel = (connection) => {
  return connection.model('User', userSchema);
};
