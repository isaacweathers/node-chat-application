var exports = module.exports = {};
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');

exports.userSchema = new Schema({
	username: {type: String, unique: true},
	password: {type: String}
});

var User = mongoose.model('User', exports.userSchema);

exports.userSchema.methods.register = function(username, password, callback) {
	var new_user = new User({username: username, password: password});
	new_user.save(function(err, new_user) {
		if (err) {
			callback(err.errors.username.message);
		}
		callback(new_user);
	});
}

exports.userSchema.methods.login = function (username, password, callback) {
	var query = User.where({username: username, password: password });
	query.findOne(function(err, user) {
		if (err) callback("Something went wrong.");
		if (user) {
			console.log(user);
			callback(user);
		} else {
			callback("Invalid credentials.");
		}
	});
}

exports.userSchema.plugin(uniqueValidator, {message: "That username has already been taken."});
