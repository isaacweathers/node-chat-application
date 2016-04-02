var exports = module.exports = {};

// For universal re-usable code. 

exports.findDuplicate = function(connections, username, fn) {
	for (var i = 0; i < connections.length; i++) {
		console.log(connections[i].user);
		if (connections[i].user != undefined && connections[i].user.username == username) {
			match = true;
			fn(match);
		} else {
			match = false;
			if (i == connections.length - 1) {
				fn(match);
			}
		}
	}
};