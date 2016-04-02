app.controller('HomeCtrl', function($scope, $http, notify, $localStorage, $sessionStorage, $websocket, io) {
	$scope.username = '',
	$scope.password = '';
	$scope.$session = $sessionStorage;
	$scope.message = "";
	$scope.messages = [];
	$scope.usersOn = 0;
	
	var socket = io();
	
	socket.on('logged in user', function(data) {
		$scope.messages.push({message: data.user.username + " has signed on!"});
		$scope.usersOn = data.users;	
		$scope.$apply();
	});

	socket.on('double sign on', function(data) {
		$scope.usersOn = data.users;
	});

	socket.on('new message', function(data) {
		$scope.messages.push({message: data.msg });
		$scope.$apply();
	});

	socket.on('anon signed on', function(data) {
		$scope.usersOn = data.users;
		$scope.$apply();
	});

	socket.on('signed off', function(data) {
		$scope.usersOn = data.users;
		$scope.messages.push({message: data.user + " has signed off!" });
		$scope.$apply();
	});

	$scope.register = function(user) {
		$http.post('/register-action', user).then(function(response) {
			if (typeof(response.data) !== 'object') {
				alert(response.data);
				return false;
			}
			alert("Registration successful!");
		});
	},

	$scope.login = function(user) {
		$http.post('/login-action', user).then(function(response) {
			console.log(response);
			if (typeof(response.data) !== 'object') {
				alert(response.data);
				return false;
			}
			alert("You have signed in!");
			// Initialize Session'
			$scope.$session._id = response.data._id;
			socket.emit('logged in user', user);
		});
	},

	$scope.logout = function() {
		if ($scope.$session._id) {
			$http.post('/logout-action').then(function(response) {
				console.log(response);
				if (response.data == "OK") {
					$scope.$session._id = '';
					socket.emit('signed off');
				}
			});
		} else {
			alert('You are not logged in.');
			$scope.$session._id = '';
		}
	}

	$scope.sendMessage = function(data) {
		$scope.messages.push({message: data.msg });
		socket.emit('send message', data);	
	}
});