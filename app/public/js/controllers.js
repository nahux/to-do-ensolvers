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
				$rootScope.errorMessage = 'User and password combination incorrect.';
			});
	}
});


////TODOS

app.controller("TodosCtrl", function($location, $scope, $http, $rootScope) {
	$scope.todos = [];
	$scope.refreshTodos = function() {
		$http.get('/todos')
			.then(function onSuccess(response) {
				$scope.todos = response.data;
			}).catch(function onError(response) {
				alert('Ha ocurrido un error: '+response.data);
			});
	}

	$scope.removeTodo = function(todo) {
		$http.delete('/todos/' + todo.id)
			.then(function onSuccess(response) {
				alert('Todo '+response.data+' successfully removed');
				$scope.refreshTodos();
			}).catch(function onError(response) {
				alert('Operation failed');
			})
	}

	$scope.refreshTodos();


});

app.controller("TodoCtrl", function($location, $scope, $http, $rootScope, $routeParams,type) {
	$scope.todo = {};

	$scope.refreshTodo = function() {
		$http.get('/todos/' + $routeParams.id)
			.then(function onSuccess(response) {
				$scope.todo = response.data;
				$scope.todo.date = new Date(response.data.date);
			}).catch(function onError(response) {
				alert('Something went wrong... '+response.data);
			});
	}

	$scope.saveTodo = function(todo) {
		//Si tiene id es update
		if (type == 'update') {
			$http.put('/todos/' + $routeParams.id, todo)
				.then(function onSuccess(response) {
					alert('Operation successful!');
					$location.url("/todos");
				}).catch(function onError(response) {
					alert('Something went wrong... '+response.data);
				});
		}
		//Sino es save
		else {
			$http.post('/todos',todo)
				.then(function onSuccess(response) {
					alert('Operation successful!');
					$location.url("/todos");
				}).catch(function onError(response) {
					alert('Something went wrong... '+response.data);
				});
		}
	}

	//Si es update se trae el todo
	if(type == 'update'){
		$scope.refreshTodo();
	}


});