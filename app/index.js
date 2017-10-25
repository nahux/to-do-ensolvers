//Express
var express = require('express');
var app = express();
app.use(express.static('./public'));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'this is the secret',
  resave: true,
	saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes ======================================================================
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/todos.js')(app);

app.listen(3000);