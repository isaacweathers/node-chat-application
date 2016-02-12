var exports = module.exports = {};
var mongoose = require('mongoose'), Schema = mongoose.Schema;

exports.userSchema = new Schema({
	username: {type: String},
	password: {type: String}
});

exports.userSchema.methods.name = function () {
	console.log(this.username)
}