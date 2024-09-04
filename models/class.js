const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Class", classSchema);
