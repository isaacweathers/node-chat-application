app.controller('HomeCtrl', function($scope, $http, notify, $localStorage, $sessionStorage, $websocket, io) {
	$scope.username = '',
	$scope.password = '';
	$scope.$session = $sessionStorage;
	$scope.message;
	$scope.usersOn = 0;
	var socket = io();

	socket.on('new message', function(data) {
		$('#chatBox').append("<div>"+data.msg+"</div>");
	});

	socket.on('signed on', function(data) {
		$scope.usersOn = data.users;
		$scope.$apply();
	});

	socket.on('signed off', function(data) {
		$scope.usersOn = data.users;
		$scope.$apply();
	})

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
		});
	},

	$scope.logout = function() {
		if ($scope.$session._id) {
			$http.post('/logout-action').then(function(response) {
				console.log(response);
				if (response.data == "OK")
					$scope.$session._id = '';
			});
		} else {
			alert('You are not logged in.');
			$scope.$session._id = '';
		}
	}

	$scope.sendMessage = function(data) {
		console.log($scope.message);
		console.log($scope);
		$scope.message = "";
		socket.emit('send message', data);	
	}
});