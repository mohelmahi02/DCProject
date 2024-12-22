const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

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

const grades = [
    { student: 'Albert Newton', module: 'Algebra', grade: 49 },
    { student: 'Albert Newton', module: 'Mechanics of Fluids', grade: 78 },
    { student: 'Alice L\'Estrange', module: '', grade: '' },
    { student: 'Alison Conners', module: 'Mechanics of Fluids', grade: 72 },
    { student: 'Alison Conners', module: 'Mechanics of Solids', grade: 79 },
    { student: 'Amanda Knox', module: 'Long Division', grade: 32 },
    { student: 'Amanda Knox', module: 'Times Tables', grade: 65 },
    { student: 'Amanda Knox', module: 'Algebra', grade: 77 },
    { student: 'Anne Greene', module: 'Poetry', grade: 45 },
    { student: 'Anne Greene', module: 'Creative Writing', grade: 56 },
    { student: 'Anne Greene', module: 'Shakespeare', grade: 71 },
    { student: 'Barbara Harris', module: '', grade: '' },
    { student: 'Bill Turpin', module: 'Shakespeare', grade: 68 },
    { student: 'Brian Collins', module: 'Algebra', grade: 28 },
    { student: 'Brian Collins', module: 'Times Tables', grade: 91 },
    { student: 'Brian Collins', module: 'Long Division', grade: 92 },
    { student: 'Fiona O\'Hehir', module: 'Creative Writing', grade: 55 },
    { student: 'George Johnson', module: 'Poetry', grade: 72 },
    { student: 'George Johnson', module: 'Creative Writing', grade: 82 },
    { student: 'James Joyce', module: 'Mobile Applications Development', grade: 32 },
    { student: 'Johnny Connors', module: 'Mechanics of Fluids', grade: 35 },
    { student: 'Johnny Connors', module: 'Mechanics of Solids', grade: 32 },
];

app.get("/", (req, res) => {
    console.log("GET /");
    res.render("index", { title: "Home Page" });
});

app.get("/students", (req, res) => {
    console.log("GET /students");
    res.render("students", { title: "Students Page", students });
});

app.get("/students/add", (req, res) => {
    console.log("GET /students/add");
    res.render("addStudent", { title: "Add Student", errors: [], student: {} });
});

app.post("/students/add", (req, res) => {
    const { sid, name, age } = req.body;

    const errors = [];
    if (!sid || sid.trim() === "") {
        errors.push("Student ID is required");
    }
    if (!name || name.length < 2) {
        errors.push("Student Name should be at least 2 characters");
    }
    if (!age || age < 18) {
        errors.push("Student Age should be at least 18");
    }

    const existingStudent = students.find(student => student.sid === sid);
    if (existingStudent) {
        errors.push("Student ID already exists");
    }

    if (errors.length > 0) {
        return res.render("addStudent", { title: "Add Student", errors, student: { sid, name, age } });
    }

    students.push({ sid, name, age: parseInt(age, 10) });
    console.log("Student added:", { sid, name, age });
    res.redirect("/students");
});

app.get("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
    const student = students.find(student => student.sid === studentId);

    if (!student) {
        return res.status(404).send('Student not found');
    }

    res.render("editStudent", { title: "Update Student", student, errors: [] });
});

app.post("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
    const { name, age } = req.body;

    const errors = [];
    if (!name || name.length < 2) {
        errors.push('Student Name should be at least 2 characters');
    }
    if (!age || age < 18) {
        errors.push('Student Age should be at least 18');
    }

    const student = students.find(student => student.sid === studentId);
    if (!student) {
        return res.status(404).send('Student not found');
    }

    if (errors.length > 0) {
        return res.render("editStudent", { title: "Update Student", student: { ...student, name, age }, errors });
    }

    student.name = name;
    student.age = parseInt(age, 10);

    res.redirect("/students");
});

app.get("/grades", (req, res) => {
    const sortedGrades = grades.sort((a, b) => {
        if (a.student < b.student) return -1;
        if (a.student > b.student) return 1;
        return a.grade - b.grade;
    });

    res.render("grades", { title: "Grades Page", grades: sortedGrades });
});

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.listen(3004, () => {
    console.log("Application listening on port 3004");
});
