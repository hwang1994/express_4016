var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs = require('fs')

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

app.post('/saveString', (req, res) => {
    fs.writeFile('assignment3/string.txt', req.body.data, (err) => {          
        if (err) {
            console.log(err);
        }
        else {
            res.send('saved ' + req.body.data);
        }
    });
});
app.get('/getString', (req, res) => {
    fs.readFile('assignment3/string.txt', (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.send(data.toString());
        }
    })
});
app.get('/busywait', (req, res) => {
	let result = 0;	
	for (var i = Math.pow(parseInt(process.env.envValue), 7); i >= 0; i--) {		
		result += Math.atan(i) * Math.tan(i);
	};
    res.send('busywait result ' + result);
});

module.exports = app;