app.controller('HomeCtrl', function($scope, $http, notify, $localStorage, $sessionStorage, $websocket, io, $window) {
	$scope.username = '',
	$scope.password = '';
	$scope.$session = $sessionStorage;
	$scope.message = "";
	$scope.messages = [];
	$scope.usersOn = 0;
	
	var socket = io();

	// TO-DO: fix the refreshing error
	
	// $scope.init = function() {
	// 	console.log($scope.$session._id != null);
	// 	if ($scope.$session._id != null && $scope.usersOn < 1) {
	// 		socket.emit('logged in user');
	// 	}
	// }

	socket.on('logged in user', function(data) {
		$scope.messages.push({message: data.user.username + " has signed on!"});
		$scope.usersOn = data.users;	
		$scope.$apply();
	});

	socket.on('double sign on', function(data) {
		$scope.usersOn = data.users;
	});

	socket.on('new message', function(data) {
		$scope.messages.push({username: data.username, message: data.msg });
		$scope.$apply();
	});

	socket.on('anon signed on', function(data) {
		$scope.usersOn = data.users;
		$scope.$apply();
	});

	socket.on('signed off', function(data) {
		$scope.usersOn = data.users;
		console.log(data.users);
		$scope.messages.push({message: data.user + " has signed off!" });
		$scope.$apply();
	});

	$scope.$on('$viewContentLoaded', function() {
		if ($scope.$session._id) {
			
		}
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
			if (typeof(response.data) !== 'object') {
				alert(response.data);
				return false;
			}
			alert("You have signed in!");

			// Initialize Session'
			$scope.$session._id = response.data._id;
			$scope.username = user.username;
			socket.emit('logged in user', user);
		});
	},

	$scope.logout = function() {
		if ($scope.$session._id) {
			$http.post('/logout-action').then(function(response) {
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
		socket.emit('send message', { msg: data, username: $scope.username });	
	}
});
