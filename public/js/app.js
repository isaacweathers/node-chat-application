var app = angular.module('myChatApp', ['ngRoute', 'cgNotify', 'ngStorage', 'ngWebSocket']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		});
}]);

app.value('io', io);