const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('students', { title: 'Students Page' });
});

module.exports = router;
