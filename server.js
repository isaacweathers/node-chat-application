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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register-action', function(req, res) {
	var new_user = new User(req.body);
	new_user.save(function(err, new_user) {
		if (err) {
			console.log(err.errors.username.message);
			res.send(200, err.errors.username.message);
		}
		res.send(200, new_user);
	});
});

app.listen(8000);