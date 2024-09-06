const express = require("express");
const Attendance = require("../models/attendence");

const router = express.Router();

router.post("/new", async (req, res) => {
  const { classId, studentId, status, date, markedBy } = req.body;

  try {
    const newAttendence = new Attendance({
      classId,
      studentId,
      status,
      date,
      markedBy,
    });
    await newAttendence.save();
    res.status(201).json({ message: "Attendence taked well" });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:attendanceId", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.attendanceId);
    if (!attendance) {
      return res.status(500).json({ message: "Attandance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put("/:attendanceId", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.attendanceId);
    if (!attendance) {
      return res.status(404).json({ error: "attendance not found" });
    }
    const updateattendance = await Attendance.findByIdAndUpdate(
      req.params.attendanceId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ updateattendance, message: "update attendance scasseflly" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
