var exports = module.exports = {};
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');

var usernameValidator = [
	validate({
		validator: 'isLength',
		arguments: [3,15],
		message: 'The username should be between {ARGS[0]} and {ARGS[1]} characters.'
	}),
	validate({
		validator: 'isAlphanumeric',
		passIfEmpty: true,
		messagE: 'The username should only contain alpha numeric characters only.'
	})
];

exports.userSchema = new Schema({
	username: {type: String, unique: true},
	password: {type: String}
});

exports.userSchema.methods.name = function () {
		console.log(this.username);
}

exports.userSchema.plugin(uniqueValidator, {message: "That username has already been taken."});