const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentid: {type: String , required : true},
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
