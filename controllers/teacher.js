const express = require('express');
const Teacher = require('../models/Teacher');
const verifyToken = require('../middleware/verify-token');
const Class = require('../models/class');
const Attendance = require('../models/attendence');
const router = express.Router();


// router.post('/', async (req, res) => {
//     try {
//         const teacher = new Teacher(req.body);
//         await teacher.save();
//         res.status(201).json(teacher);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


// router.get('/', async (req, res) => {
//     try {
//         const teachers = await Teacher.find().populate('classes');
//         res.json(teachers);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


// router.put('/:teacherid', async (req, res) => {
//     try {
//         const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body);
//         res.json(teacher);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


// router.delete('/:teacherid', async (req, res) => {
//     try {
//         await Teacher.findByIdAndDelete(req.params.id);
//         res.status(204).json();
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

// module.exports = router;

// router.post('/' , verifyToken ,async (req,res)=>{
//   const attendance = await Attendance.findByIdAndUpdate(req.params.id) 
  
// })