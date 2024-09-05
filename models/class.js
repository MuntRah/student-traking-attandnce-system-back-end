const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  //   teacherId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  //   schedule: [
  //     {
  //       day: { type: String, required: true },
  //       startTime: { type: String, required: true },
  //       endTime: { type: String, required: true },
  //     },
  //   ],
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
