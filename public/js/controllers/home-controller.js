app.controller('HomeCtrl', function($scope, $http) {
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
});