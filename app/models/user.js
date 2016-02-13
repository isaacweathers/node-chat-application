var exports = module.exports = {};
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var validate = require('mongoose-validator');

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
	username: {type: String, validate: usernameValidator },
	password: {type: String}
});

exports.userSchema.methods.name = function () {
		console.log(this.username);
}