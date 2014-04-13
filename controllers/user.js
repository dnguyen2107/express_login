var passport = require('passport');
var User = require('../models/user');

var users = [{
    email: 'test01@gmail.com',
    password: '123'
}, {
    email: 'test02@gmail.com',
    password: '123'
}];

exports.list = function(req, res) {
    res.json({
        title: 'Users List',
        users: users
    });
};

exports.login = function(req, res) {
    res.render('login');
}


exports.authorize = function(req, res) {
    User.register(new User({
        email: req.body.email,
        password: req.body.password
    }), req.body.password, function(err, account) {
        if (err) {
            return res.send('Error authorized!' + req.body.email + ' ' + req.body.password);
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/home');
        });
    });
};
