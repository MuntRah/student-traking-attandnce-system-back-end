const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const Attendance = require("../models/attendence");

router.get("/:classId/student/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    const classData = await Class.findById(classId).populate(
      "teacherId",
      "username email"
    );

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const isStudentInClass = classData.students.some(
      (student) => student._id.toString() === studentId
    );

    if (!isStudentInClass) {
      return res.status(403).json({ message: "Access denied" });
    }

    const attendanceRecords = await Attendance.find({
      classId,
      studentId,
    });

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
