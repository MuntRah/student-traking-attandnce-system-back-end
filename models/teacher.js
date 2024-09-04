const teacherSchema = new mongoose.Schema({
  TeacherName: { type: String, required: true },
  TeacherId : {type: String , required: true},
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
