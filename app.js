var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var configDB = require('./config/database');

//database configuration
mongoose.connect(configDB.url, function(err) {
	console.log("Connnecting to " + configDB.url);
	if(err) {
		console.log("Cannot connect to db " + err);
		return;
	}
	console.log("DB server connected successfully!");
});

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
	app.set('views', path.join(__dirname, 'views'));
    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('view options', {layout: 'layout.ejs'});
    app.use(express.session({
        secret: 'this is secret session key'
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(express.static(path.join(__dirname, 'public')));

});
// routes
require('./routes/routes.js')(app, passport);
//launch the appplication
app.listen(port);
console.log('The app server is listening on port ' + port);
