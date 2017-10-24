// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

//Guardo user en memoria
var users = 
	[{
		username: 'nahu',
		password: '123',
		id: 1
	}];

// expose this function to our app using module.exports
module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use('local-login', new LocalStrategy(
		function(username, password, done) {
		 var user = users.find(x => x.username === username);
		 // if no user is found, return the message
		 if (!user)
				 return done(null, false);

		 // if the user is found but the password is wrong
		 //if (!user.validPassword(password))
		 if(user.password != password)
				 return done(null, false); 

		 // all is well, return successful user
		 return done(null, user);
		}
	));
};