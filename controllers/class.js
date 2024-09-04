const express = require('express');
const Class = require('../models/Class');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const classObj = Class.create(req.body);
        await classObj.save();
        res.status(201).json(classObj);
    } catch (error) {
        res.status(400).json({ error: 'Error creating class.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const classes = await Class.find().populate('teacher students');
        res.json(classes);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching classes.' });
    }
});


router.put('/:classid', async (req, res) => {
    try {
        const classObj = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(classObj);
    } catch (error) {
        res.status(400).json({ error: 'Error updating class.' });
    }
});


router.delete('/:classid', async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: 'Error deleting class.' });
    }
});

module.exports = router;
