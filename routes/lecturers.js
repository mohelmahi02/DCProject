const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');


router.get('/', async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.render('lecturers', { title: 'Lecturers Page', lecturers });
    } catch (err) {
        console.error('Error fetching lecturers:', err.message);
        res.status(500).send('Error fetching lecturers.');
    }
});

module.exports = router;
