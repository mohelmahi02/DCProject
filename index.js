var express = require('express')
var app = express()


app.use((req, res, next) => {
    console.log("MIDDLEWARE")
    next()
})

var updateServeReq = function (req, res, next) {
    console.log("Website accessed");
}

app.listen(3004, () => {
    console.log("Application listening on port 3004")
})


app.get("/", (req, res) => {
    console.log("GET")
    res.send("<h1>This is Question 1.1<h1>")
})
