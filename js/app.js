var app = angular.module("app", ["ngRoute","ngResource"]);


//Constantes
app.constant('CONFIG', {
	TEMPLATE_DIR:"templates/",
	ROL_CURRENT_USER: 3
})

.constant('ROLES', {
	ADMIN: {
		ROL:1,
		PATH:"/admin"
	},
	USER: {
		ROL:2,
		PATH:"/user"
	},
	GUEST: {
		ROL:3,
		PATH:"/guest"
	}
})


//Rutas
.config(["$routeProvider", "CONFIG", "ROLES", function($routeProvider, CONFIG, ROLES)
{
	$routeProvider.when('/', {
		redirectTo: "/home"
	})
	.when("/home", {
		templateUrl: CONFIG.TEMPLATE_DIR+'home.html',
		controller: 'homeCtrl',
		data: {
			authorized: [ROLES.ADMIN.ROL,ROLES.USER.ROL]
		}
	})
	.when("/admin", {
		templateUrl: CONFIG.TEMPLATE_DIR+'admin.html',
		controller: 'adminCtrl',
		data: {
			authorized: [ROLES.ADMIN.ROL]
		}
	})
	.when("/user", {
		templateUrl: CONFIG.TEMPLATE_DIR+'user.html',
		controller: 'userCtrl',
		data: {
			authorized: [ROLES.ADMIN.ROL,ROLES.USER.ROL]
		}
	})
	.when("/guest", {
		templateUrl: CONFIG.TEMPLATE_DIR+'guest.html',
		controller: 'guestCtrl',
		data: {
			authorized: [ROLES.GUEST.ROL]
		}
	})
}])


.run(["$rootScope", "$location", "CONFIG", "ROLES", function($rootScope, $location, CONFIG, ROLES)
{
	$rootScope.$on('$routeChangeStart', function (event, next) 
	{
		if (next.data !== undefined) 
		{
			//Compruebo si el usuario tiene acceso
			if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
			{
				console.log("entra");
			}
			else
			{
				if(CONFIG.ROL_CURRENT_USER == 1)
				{
					$location.path(ROLES.ADMIN.PATH);
				}
				else if(CONFIG.ROL_CURRENT_USER == 2)
				{
					$location.path(ROLES.USER.PATH);
				}
				else if(CONFIG.ROL_CURRENT_USER == 3)
				{
					$location.path(ROLES.GUEST.PATH);
				}

			}
		}
	});
}]);