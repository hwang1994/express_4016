var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { exec } = require("child_process");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/foo', function(req, res, next) {
    res.send('bar');
});
app.post('/hello', (req, res) => {
    res.send('Hello ' + req.body.name + '!');
});

module.exports = app;

// app.listen(8080, () => {
//     console.log("Listen on the port 8080...");
// });