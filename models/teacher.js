const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
