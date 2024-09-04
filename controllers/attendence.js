const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: 'Error marking attendance.' });
    }
});


router.get('/class/:classId', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ class: req.params.classId })
            .populate('student')
            .populate('class');
        res.json(attendanceRecords);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching attendance records.' });
    }
});


router.get('/student/:studentId', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ student: req.params.studentId })
            .populate('student')
            .populate('class');
        res.json(attendanceRecords);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching attendance records.' });
    }
});


router.put('/:studentId', async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(attendance);
    } catch (error) {
        res.status(400).json({ error: 'Error updating attendance record.' });
    }
});


// router.delete('/:id', async (req, res) => {
//     try {
//         await Attendance.findByIdAndDelete(req.params.id);
//         res.status(204).json();
//     } catch (error) {
//         res.status(400).json({ error: 'Error deleting attendance record.' });
//     }
// });

module.exports = router;
