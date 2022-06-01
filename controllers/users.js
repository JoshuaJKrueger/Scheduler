
/*
    Holds the logic for the user routes
*/

const User = require('../models/user');

module.exports.renderRegister = (request, response) => { response.render('users/register'); };

module.exports.register = async (request, response, next) => {
    // Created to shorten the next line
    const user = new User({ email: request.body.email, username: request.body.username });

    request.login(await User.register(user, request.body.password), error => {
        if (error) return next(error);

        request.flash('Success', 'Account created successfully.');
        response.redirect('/');
    });
};

module.exports.renderLogin = (request, response) => { response.render('users/login'); };

module.exports.login = (request, response) => {
    request.flash('Success', 'Logged in successfully.');

    // Redirects user back to the page they were going to if they were stopped by middleware
    const redirectUrl = request.session.returnTo || '/';
    delete request.session.returnTo;

    response.redirect(redirectUrl);
};

module.exports.logout = (request, response) => {
    request.logout();

    // request.session.destroy(); // TODO: Passport might do this for me

    request.flash('Success', 'Successfully logged out.');
    response.redirect('/');
};
