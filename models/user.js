const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
=======
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  isTeacher: { type: Boolean },
  isAdmint: {type: Boolean , default: false}
>>>>>>> 1079d5d13457de7b4a8c99cf43ef78cdc5668ad6
});

const User = mongoose.model('User', userSchema);
module.exports = User;
