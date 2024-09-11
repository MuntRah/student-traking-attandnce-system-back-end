const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const Attendance = require("../models/attendence");

// Fetch class details and attendance for a specific student
router.get("/:classId/student/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    // Find the class by ID
    const classData = await Class.findById(classId)
      .populate("teacherId", "username email")
      .populate("students", "username email");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the student is part of the class
    const isStudentInClass = classData.students.some(
      (student) => student._id.toString() === studentId
    );

    if (!isStudentInClass) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find attendance records for the student in the class
    const attendanceRecords = await Attendance.find({
      classId,
      studentId,
    });

    res.status(200).json({ classData, attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
