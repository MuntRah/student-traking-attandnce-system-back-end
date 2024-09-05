const express = require("express");
const Class = require("../models/class");
const router = express.Router();

// Create a new class
router.post("/new", async (req, res) => {
  const { className, classCode, teacherId, schedule } = req.body;
  try {
    const newClass = new Class({ className, classCode, teacherId, schedule });
    await newClass.save();
    res.status(201).json({ message: "Class created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get class details
router.get("/", async (req, res) => {
  const { classId } = req.params;
  try {
    const classData = await Class.findById(classId)
      .populate("teacherId")
      .populate("students");
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
