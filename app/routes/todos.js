var uuid = require('uuid/v4');

var todos = [
							{
								id:0,
								title:"Finish twitter module",
								date:"2017-12-23", 
								desc:"Need to finish the twitter module for the app",
								done:false 
							}
						];
var todosById = [
									{
										id:0,
										title:"Finish twitter module",
										date:"2017-12-23", 
										desc:"Need to finish the twitter module for the app",
										done:false 
									}
								];
module.exports = function(app) {
	app.put('/todos/:id', function(req, res, next) {
		var updatedTodo = req.body;
		
		var id = req.params["id"];    
		var todo = todos.find(x => x.id == id);
		if (todo) {
			var index = todos.indexOf(todo); 
			todos[index] = updatedTodo;
			todosById[todo.id] = updatedTodo;
			res.json(todo);
		} else {
				res.status(404).send("not found");
		}
	});


	app.get('/todos', function(req, res, next) {
		res.json(todos);
	});

	app.get('/todos/:id', function(req, res, next) {
		var id = req.params["id"];    
		var todo = todosById[id];
		if (todo) {
				res.json(todo);
		} else {
				res.status(404).send("not found");
		}
	});

	app.delete('/todos/:id', function(req, res, next) {
		var id = req.params["id"];    
		var todo = todosById[id];
		
		if (todo) {
				delete todosById[id];
				todos.splice(todos.indexOf(todo), 1)
				res.json(todo);
		} else {
				res.status(404).send("not found");
		}
		
	});


	app.post('/todos', function(req, res, next) {
		var todo = req.body;
		todo.id = uuid();
		todos.push(todo);
		todosById[todo.id] = todo;
		res.send(todo);
	});

}
