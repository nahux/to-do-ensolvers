//Componente Home
angular
	.module('app')
	.component('home', {
		templateUrl: 'home.html'
});

angular
	.module('app')
	.controller('homeCtrl', ['$scope', '$location', 'ROLES', function ($scope,$location,roles) 
	{
		console.log("home");

	}])

	.controller('adminCtrl', ['$scope', '$location', 'ROLES', function ($scope,$location,roles)
	{
		console.log("home");
	}])

	.controller('userCtrl', ['$scope', '$location', 'ROLES', 'CONFIG', function ($scope,$location,roles,config)
	{
		$scope.logOut = function(user) {
			config.ROL_CURRENT_USER = 3;
			$location.path(roles.GUEST.PATH)
		}
		console.log("user");
	}])

	.controller('loginCtrl', ['$scope', '$location', 'ROLES', 'CONFIG', function ($scope,$location,roles,config)
	{
		$scope.login = function(user) {
			config.ROL_CURRENT_USER = 1;
			$location.path(roles.USER.PATH);
		}
		console.log("guest");
	}])