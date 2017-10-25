var app = angular.module("PassportApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})/*
		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignUpCtrl'
		})*/
		.when('/todos', {
			templateUrl: 'views/todos.html',
			controller: 'TodosCtrl',
			resolve: {
				logincheck: checkLoggedin
			}
		})
		.when('/todos/new', {
			templateUrl: 'views/todo.html',
			controller: 'TodoCtrl',
			resolve: {
				logincheck: checkLoggedin,
				"type": function() {
					return 'new'
				}
			}
		})
		.when('/todos/:id?', {
			templateUrl: 'views/todo.html',
			controller: 'TodoCtrl',
			resolve: {
				logincheck: checkLoggedin,
				"type": function() {
					return 'update'
				}
			}
		})
		.otherwise({
			redirectTo: '/'
		})
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
	var deferred = $q.defer();

	$http.get('/loggedin')
		.then(function onSuccess(response) {
			$rootScope.errorMessage = null;
			//User is Authenticated
			if (response.data) {
				$rootScope.currentUser = response.data;
				deferred.resolve();
			} else { //User is not Authenticated
				$rootScope.errorMessage = 'You need to log in.';
				deferred.reject();
				$location.url('/login');
			}
		});
	return deferred.promise;
}
