const express = require('express');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));


const studentsRoutes = require('./routes/students');
const gradesRoutes = require('./routes/grades');
const lecturersRoutes = require('./routes/lecturers');


app.use('/students', studentsRoutes);
app.use('/grades', gradesRoutes);
app.use('/lecturers', lecturersRoutes);


app.get("/", (req, res) => {
    console.log("GET /");
    res.render("index", { title: "Home Page" });
});


app.listen(3004, () => {
    console.log("Application listening on port 3004");
});
