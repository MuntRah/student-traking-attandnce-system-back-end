function isTeacher(req, res, next) {
  if (req.user.role !== "teacher") {
    return res
      .status(401)
      .json({ error: "Unauthorized : user is not Teacher" });
  }

  next();
}

module.exports = isTeacher;
