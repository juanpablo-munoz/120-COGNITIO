//angular.module('mainApp', ['ngRoute', 'rutasApp', 'control1', 'control2', 'servicio2']);
//mainApp
var app = angular.module('mainApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

	// home page
	.when('/', {
		templateUrl: 'views/inicio.html',
		controller: 'control1'
	})

	// nerds page that will use the NerdController
	.when('/num2', {
		templateUrl: 'views/num2.html',
		controller: 'control2'
	});

	$locationProvider.html5Mode(true);

}]);
