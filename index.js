var express = require('express');
var app = express();


app.set('view engine', 'ejs');

app.listen(3004, () => {
    console.log("Application listening on port 3004");
});

app.get("/", (req, res) => {
    console.log("GET /");
    res.render("index", { title: "Home Page" });
});

app.get("/students", (req, res) => {
    console.log("GET /students");
    res.render("students", { title: "Students Page" });
});

app.get("/grades", (req, res) => {
    console.log("GET /grades");
    res.render("grades", { title: "Grades Page" });
});

app.get("/lecturers", (req, res) => {
    console.log("GET /lecturers");
    res.render("lecturers", { title: "Lecturers Page" });
});
