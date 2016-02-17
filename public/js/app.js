var app = angular.module('myChatApp', ['ngRoute', 'cgNotify', 'ngStorage']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		});
}]);