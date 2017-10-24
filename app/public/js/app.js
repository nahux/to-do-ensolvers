var app = angular.module("app", ["ui.router","ngResource"]);


//Rutas
angular
	.module('app')
	.config(routesConfig);

	function routesConfig($stateProvider, $urlRouterProvider, $locationProvider){
		$urlRouterProvider.otherwise('/');
		
		//Estado home
		$stateProvider
			.state('home', {
				url: '/',
				component: 'home'
			});

		//Estado login
		$stateProvider
			.state('login', {
				url: '/login',
				component: 'login'
			});
	}