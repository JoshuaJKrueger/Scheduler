// Packages
const express = require('express');

const statistics = require('../controllers/statistics');
const Statistic = require('../models/statistic');
const authenticate = require('../middleware/authentication');
const catchAsyncErrors = require('../utilities/catchAsyncErrors');

const router = express.Router();

router.route('/')
    .get(authenticate.isLoggedIn, statistics.showAll);

router.route('/new', authenticate.isLoggedIn, statistics.create);

router.route('/:id')
    .get(statistics.edit)
    .put(authenticate.isOwner, statistics.save)
    .delete(authenticate.isOwner, statistics.delete);

module.exports = router;
