var user = require('../controllers/user');

module.exports = function(app, passport) {
    //user routes
    app.get('/', user.login);
    app.get('/users', user.list);
    app.post('/authorize', user.authorize);
}
