var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var userModule = require('./app/models/user.js');
var path = require('path');
var bodyParser = require('body-parser');
var User = mongoose.model('User', userModule.userSchema);
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

// Application settings

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// ROUTING

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register-action', function(req, res) {
	userModule.userSchema.methods.register(req.body.username, req.body.password, function(response) {
		res.send(200, response);
	});
});

app.post('/login-action', function(req, res) {
	userModule.userSchema.methods.login(req.body.username, req.body.password, function(response) {
		res.send(200, response);
	});
});

app.listen(8000);