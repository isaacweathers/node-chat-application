var http = require('http');
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var express = require('express');

var userSchema = new Schema({
	username: {type: String},
	password: {type: String}
});

function handleRequest(request, response) {
	response.end('It works!' + request.url);
}


var server = http.createServer(handleRequest);

server.listen(8000, function () {
	console.log("I'm listening!");
});