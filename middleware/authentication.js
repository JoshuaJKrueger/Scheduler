module.exports.isLoggedIn = (request, response, next) => {
    if (!request.isAuthenticated()) {
        request.session.returnTo = request.originalUrl;
        request.flash('Error', 'You must be logged in to access that.');

        return response.redirect('/login')
    }

    next();
};

// TODO: May or may not need depending on how I set up tasks/reminders/...
/*
    Works as authorization modification/deletion of tasks/...
*/
module.exports.isOwner = async (request, response, next) => {
    next();
};
