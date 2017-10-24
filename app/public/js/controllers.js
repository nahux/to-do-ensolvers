app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
	$scope.logout = function() {
		$http.post("/logout")
			.then(function onSuccess() {
				$rootScope.currentUser = null;
				$location.url("/");
			}).catch(function onError(response) {
				alert(response.data);
			});
	}
});

/*
app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
	$scope.signup = function(user) {

		if (user.password == user.password2) {
			$http.post('/signup', user)
				.success(function(user) {
					$rootScope.currentUser = user;
					$location.url("/todos");
				});
		}
	}
});*/

app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
	$scope.login = function(user) {
		$http.post('/login', user)
			.then(function onSuccess(response) {
				$rootScope.currentUser = response;
				$location.url("/todos");
			}).catch(function onError(response) {
				$rootScope.errorMessage = 'Usuario y/o contraseña incorrecto/s';
			});
	}
});