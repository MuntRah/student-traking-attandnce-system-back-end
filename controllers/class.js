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
router.get("/:classId", async (req, res) => {
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

router.put("/:classId", async (req, res) => {
  try {
    const existingClass = await Class.findById(req.params.classId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:classId", async (req, res) => {
  try {
    const classToDelete = await Class.findById(req.params.classId);
    if (!classToDelete) {
      return res.status(404).json({ error: "Class not found" });
    }
    await Class.findByIdAndDelete(req.params.classId);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
