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

module.exports = router;
