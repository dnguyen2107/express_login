//passport config
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, config) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
