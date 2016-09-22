var app = angular.module('mainApp', ['ngRoute','ngMaterial','ngMessages']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/auth/inicio.html',
		controller: 'controllogin'
	})
	
	.when('/registro', {
		templateUrl: 'views/auth/registro.html',
		controller: 'controllogin'
	});

	$locationProvider.html5Mode(true);

}]);
