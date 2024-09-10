const Class = require("../models/class");

// Middleware to check if the user is a teacher or student in the class
const checkAccessToClass = async (req, res, next) => {
  const { classId } = req.params;
  const userId = req.user._id; // Assuming user ID is in req.user after JWT verification

  try {
    // Find the class by ID
    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: "Class not found" });

    // Check if the user is the teacher
    if (classData.teacherId.toString() === userId.toString()) {
      return next(); // User is the teacher, grant access
    }

    // Check if the user is one of the students
    const isStudent = classData.students.some(
      (studentId) => studentId.toString() === userId.toString()
    );
    if (isStudent) {
      return next(); // User is a student, grant access
    }

    // If neither teacher nor student, deny access
    return res.status(403).json({
      message:
        "Access denied. Only assigned students and teachers can view this class.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkAccessToClass;
