const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
