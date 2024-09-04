const express = require('express');
const Student = require('../models/Student');
const verifyToken = require('../middleware/verify-token');
verifyToken
const router = express.Router();


router.post('/',verifyToken, async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/',verifyToken, async (req, res) => {
    try {
        const students = await Student.find().populate('classes');
        res.json(students);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/:studentid',verifyToken, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body);
        res.json(student);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.delete('/:studentid',verifyToken, async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
