var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var userModule = require('./app/models/user.js');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var User = mongoose.model('User', userModule.userSchema);

db.once('open', function() {
	var new_user = new User({username: 'Miles', password: 'monkey'});
	new_user.save(function(err, new_user) {
		if (err) {
			console.log("Something is wrong.");
			return false;
		}
		console.log(new_user);
	});
});

function handleRequest(request, response) {
	response.end('It works!' + request.url);
}
var server = http.createServer(handleRequest);

server.listen(8000, function () {
	console.log("I'm listening!");
});

