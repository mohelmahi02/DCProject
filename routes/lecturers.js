const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('lecturers', { title: 'Lecturers Page' });
});

module.exports = router;
