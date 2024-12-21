const express = require('express');
const router = express.Router();


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
    res.render('students', { title: 'Students Page', students }); 
});

module.exports = router;
