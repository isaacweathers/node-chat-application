app.controller('HomeCtrl', function($scope, $http, notify, $localStorage, $sessionStorage) {
	$scope.username = '',
	$scope.password = '';
	$scope.$session = $sessionStorage;

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
			console.log(response.data._id);
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
});