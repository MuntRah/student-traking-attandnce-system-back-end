const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const attendanceCtrl = require("./controllers/attendence");
const classCtrl = require("./controllers/class");
const classDetailCtrl = require("./controllers/classDetail");
const adminCtrl = require("./controllers/admin");
const verifyToken = require("./middleware/verify-token");
const isTeacher = require("./middleware/isTeacher");
const isAdmin = require("./middleware/isAdmin");

// const studentCtrl = require("./controllers/student");
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use("/test-jwt", verifyToken, testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", verifyToken, profilesRouter);
app.use("/attendance", verifyToken, isTeacher, attendanceCtrl);
app.use("/admin/users", verifyToken, isAdmin, adminCtrl);
app.use("/admin/class", verifyToken, isAdmin, classCtrl);
app.use("/class", verifyToken, classDetailCtrl);

// app.use("/student", studentCtrl);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
