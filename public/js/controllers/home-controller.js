app.controller('HomeCtrl', function($scope, $http, notify) {
	$scope.username = '',
	$scope.password = '';
	$scope.login = function() {

	},
	$scope.register = function(user) {
		$http.post('/register-action', user).then(function(response) {
			if (typeof(response.data) !== 'object') {
				alert(response.data);
				return false;
			}
			alert("Registration successful!");
		});
	}

	$scope.login = function(user) {
		$http.post('/login-action', user).then(function(response) {
			console.log(response);
			if (typeof(response.data) !== 'object') {
				alert(response.data);
				return false;
			}
			alert("You have signed in!");	
		});
	}
});