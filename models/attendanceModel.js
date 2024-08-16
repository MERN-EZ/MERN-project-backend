const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  attendance: {
    date: Map,
    of: String,
    required: true,
  },
});

export const getAttendanceModel = (connection) => {
  return connection.model('attendance', userSchema);
};
