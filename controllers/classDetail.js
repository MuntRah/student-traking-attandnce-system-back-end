const express = require("express");
const Class = require("../models/class");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");


router.get("/", verifyToken, async (req, res) => {
  const userId = req.user._id;

  try {

    const classes = await Class.find({
      $or: [{ teacherId: userId }, { students: userId }],
    });

    if (classes.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for this user" });
    }

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:classId", verifyToken, async (req, res) => {
  const { classId } = req.params;
  const userId = req.user._id;

  try {
    const classData = await Class.findOne({
      _id: classId,
      $or: [{ teacherId: userId }, { students: userId }],
    })
      .populate("teacherId", "username email")
      .populate("students", "username email");

    if (!classData)
      return res
        .status(404)
        .json({ message: "Class not found or access denied" });

    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
