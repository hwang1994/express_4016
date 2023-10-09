var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
app.get('/kill', (req, res) => {
    process.exit(1);
});

app.get('/configValue', (req, res) => {
    res.send(process.env.configValue);
});
app.get('/secretValue', (req, res) => {
    res.send(process.env.secretValue);
});
app.get('/envValue', (req, res) => {
    res.send(process.env.envValue);
});

module.exports = app;