const express = require("express");
const Class = require("../models/class");
const router = express.Router();
const checkAccessToClass = require("../middleware/checkAccessToClass");
const verifyToken = require("../middleware/verify-token");

router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    if (classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:classId", checkAccessToClass, verifyToken, async (req, res) => {
  const classId = req.params;
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

module.exports = router;
