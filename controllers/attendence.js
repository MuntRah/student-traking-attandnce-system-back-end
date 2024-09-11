const express = require("express");
const Attendance = require("../models/attendence");
const mongoose = require("mongoose");
const router = express.Router();

const Class = require("../models/class");

router.get("/index/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const teacherId = req.user._id; // Make sure this is populated correctly

    // Check if classId is valid
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    // Fetch attendance records
    const attendance = await Attendance.find({
      classId,
      markedBy: teacherId,
    }).populate("studentId");

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance found" });
    }

    // Respond with found attendance records
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to mark attendance
router.post("/new/:classId", async (req, res) => {
  const { classId } = req.params;
  const { attendanceRecords, date } = req.body; // Expects an object where key = studentId, value = attendance status
  const teacherId = req.user._id; // From auth middleware

  try {
    // Check if class exists and fetch the associated teacher and students
    const classData = await Class.findById(classId)
      .populate("teacherId")
      .populate("students");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the logged-in teacher is assigned to this class
    if (classData.teacherId._id.toString() !== teacherId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to mark attendance for this class",
      });
    }

    // Prepare attendance records to save
    const attendanceRecordsToSave = classData.students
      .map((student) => {
        const status = attendanceRecords[student._id]; // Get the attendance status from request body
        if (status) {
          return {
            classId,
            studentId: student._id,
            date: date || new Date(), // Use provided date or default to today's date
            status,
            markedBy: teacherId,
          };
        }
      })
      .filter(Boolean); // Remove undefined values if no status is provided

    if (attendanceRecordsToSave.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid attendance records provided." });
    }

    // Save attendance records in bulk
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
    // Find the attendance by ID and update the status
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
