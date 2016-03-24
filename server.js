var mongoose = require('mongoose');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');		
var userModule = require('./app/models/user.js');
var path = require('path');
var bodyParser = require('body-parser');
var User = mongoose.model('User', userModule.userSchema);
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
users = [];
connections = [];

// Application settings

http.listen(8000, function() {
	console.log("Listening on port 8000...");
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('bower_components'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
	secret: 'keyboard cat'
}));

app.use(passport.initialize());
app.use(passport.session());


// Web Sockets 

io.sockets.on('connection', function(socket) {
	connections.push(socket);
	io.emit('signed on', {users: connections.length });
	socket.on('upgrade', function(data) {
	});

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		io.emit('signed off', {users: connections.length });
	});

	socket.on('send message', function(data) {
		console.log(data);
		io.emit('new message', {msg: data});
	});
});

// Authentication
passport.use(
	new LocalStrategy(
		function (username, password, done) {
			userModule.userSchema.methods.login(username, password, function(response) {
				if (typeof(response) !== 'object') {
					done(null, false, {message: "Invalid credentials."});
				} else {
					done(null, response);
				}
			});
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// ROUTING

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register-action', function(req, res) {
	userModule.userSchema.methods.register(req.body.username, req.body.password, function(response) {
		res.send(200, response);
	});
});

app.post('/login-action', passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/failure'}),function(req, res) {

});

app.post('/logout-action', function(req, res) {
	req.logout();
	res.send(200, "OK");
});

app.get('/success', function(req, res) {
	res.send(req.user);
});

app.get('/failure', function(req, res) {
	res.send("");
});