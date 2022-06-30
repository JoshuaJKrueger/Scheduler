// Packages
const express = require('express');
const passport = require('passport');

// Custom
const catchAsyncErrors = require('../utilities/catchAsyncErrors');
const users = require('../controllers/users');

const router = express.Router();

router.route('/register')
    .post(catchAsyncErrors(users.register)); // TODO: Flash error don't go to new page

router.route('/login')
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.post('/logout', users.logout);

module.exports = router;
