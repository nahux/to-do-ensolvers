//var db = require("../models");

module.exports = function(app, passport) {
		// process the login form
		app.post("/login", passport.authenticate('local-login'), function(req, res) {
			res.json(req.user);
		});

		// handle logout
		app.post("/logout", function(req, res) {
			req.session.destroy(function (err) {
				//res.status(200);
				res.redirect('/login'); //Inside a callback… bulletproof!
			});
		})

		// loggedin
		app.get("/loggedin", function(req, res) {
			res.send(req.isAuthenticated() ? req.user : false);
		});
		
		/*
		// signup
		app.post("/signup", function(req, res) {
			db.User.findOne({
				username: req.body.username
			}, function(err, user) {
				if (user) {
					res.json(null);
					return;
				} else {
					var newUser = new db.User();
					newUser.username = req.body.username.toLowerCase();
					newUser.password = newUser.generateHash(req.body.password);
					newUser.save(function(err, user) {
						req.login(user, function(err) {
							if (err) {
								return next(err);
							}
							res.json(user);
						});
					});
				}
			});
		});*/
};