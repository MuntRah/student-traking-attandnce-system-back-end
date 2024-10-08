const express = require("express");
const Class = require("../models/class");
const router = express.Router();

router.post("/new", async (req, res) => {
  const { className, classCode, teacherId, schedule, students } = req.body;
  try {
    const newClass = new Class({
      className,
      classCode,
      teacherId,
      schedule,
      students,
    });
    await newClass.save();
    res.status(201).json({ message: "Class created successfully" });
  } catch (err) {
    console.error("Error creating class:", err); 
    res.status(500).json({ error: err.message });
  }
});

router.get("/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const classData = await Class.findById(classId)
      .populate("teacherId", "username email")
      .populate("students", "username email");
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

router.get("/", async (req, res) => {
  try {
    const classes = await Class.find().select("classCode className");
    if (classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
