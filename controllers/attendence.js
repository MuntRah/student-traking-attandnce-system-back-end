const express = require("express");
const Attendance = require("../models/attendence");
const mongoose = require("mongoose");
const router = express.Router();

const Class = require("../models/class");

router.get("/index/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const teacherId = req.user._id; 

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const attendance = await Attendance.find({
      classId,
      markedBy: teacherId,
    }).populate("studentId");

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/new/:classId", async (req, res) => {
  const { classId } = req.params;
  const { attendanceRecords, date } = req.body; 
  const teacherId = req.user._id; 

  try {
    const classData = await Class.findById(classId)
      .populate("teacherId")
      .populate("students");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classData.teacherId._id.toString() !== teacherId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to mark attendance for this class",
      });
    }

    const attendanceRecordsToSave = classData.students
      .map((student) => {
        const status = attendanceRecords[student._id]; 
        if (status) {
          return {
            classId,
            studentId: student._id,
            date: date || new Date(), 
            status,
            markedBy: teacherId,
          };
        }
      })
      .filter(Boolean); 

    if (attendanceRecordsToSave.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid attendance records provided." });
    }

    const savedRecords = await Attendance.insertMany(attendanceRecordsToSave);

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance: savedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:attendanceId", async (req, res) => {
  const { attendanceId } = req.params;
  const { status } = req.body;

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { status },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
