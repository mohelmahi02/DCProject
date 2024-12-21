const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('grades', { title: 'Grades Page' });
});

module.exports = router;
