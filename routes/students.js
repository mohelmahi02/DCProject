const express = require('express');
const router = express.Router();
const db = require('../config/db'); 


const students = [
    { sid: 'G001', name: 'New Name', age: 19 },
    { sid: 'G002', name: 'Alison Conners', age: 23 },
    { sid: 'G003', name: 'Thomas Murphy', age: 19 },
    { sid: 'G004', name: 'Anne Greene', age: 23 },
    { sid: 'G005', name: 'Tom Riddle', age: 27 },
    { sid: 'G006', name: 'Brian Collins', age: 38 },
    { sid: 'G007', name: 'Fiona O\'Hehir', age: 30 },
    { sid: 'G008', name: 'George Johnson', age: 24 },
    { sid: 'G009', name: 'Albert Newton', age: 31 },
    { sid: 'G010', name: 'Marie Yeats', age: 21 },
    { sid: 'G011', name: 'Jonathon Small', age: 22 },
    { sid: 'G012', name: 'Barbara Harris', age: 23 },
    { sid: 'G013', name: 'Oliver Flanagan', age: 19 },
    { sid: 'G014', name: 'Neil Blaney', age: 34 },
    { sid: 'G015', name: 'Nigel Delaney', age: 19 },
    { sid: 'G016', name: 'Johnny Connors', age: 29 },
    { sid: 'G017', name: 'Bill Turpin', age: 18 },
    { sid: 'G018', name: 'Amanda Knox', age: 23 },
    { sid: 'G019', name: 'James Joyce', age: 39 },
    { sid: 'G020', name: 'Alice L\'Estrange', age: 32 },
];

router.get('/', (req, res) => {
  
    db.query('SELECT * FROM student', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
          
            res.render('students', { title: 'Students Page', students });
        } else {
            res.render('students', { title: 'Students Page', students: results });
        }
    });
});


router.get('/edit/:sid', (req, res) => {
    const studentId = req.params.sid;

    
    db.query('SELECT * FROM student WHERE sid = ?', [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err);
            res.status(500).send('Database error');
        } else if (results.length === 0) {
            res.status(404).send('Student not found');
        } else {
            res.render('editStudent', { title: 'Update Student', student: results[0], errors: [] });
        }
    });
});


router.post('/edit/:sid', (req, res) => {
    const studentId = req.params.sid;
    const { name, age } = req.body;

    
    const errors = [];
    if (!name || name.length < 2) {
        errors.push('Student Name should be at least 2 characters');
    }
    if (!age || age < 18) {
        errors.push('Student Age should be at least 18');
    }

    if (errors.length > 0) {
      
        res.render('editStudent', { title: 'Update Student', student: { sid: studentId, name, age }, errors });
    } else {
        
        db.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, studentId], (err) => {
            if (err) {
                console.error('Error updating student:', err);
                res.status(500).send('Database error');
            } else {
                res.redirect('/students'); 
            }
        });
    }
});

module.exports = router;