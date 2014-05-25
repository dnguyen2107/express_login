module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('home.ejs');
    });

    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login', 
        failureFlash: true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {
    	res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', 
        failureRedirect: '/signup', 
        failureFlash: true // allow flash messages
    }));

    //user profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

   	//logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //facebook login
    app.get('/auth/facebook', function(req, res) {
    	
    });
};

//check if user logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
