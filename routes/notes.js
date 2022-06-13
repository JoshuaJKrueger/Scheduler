// Packages
const express = require('express');

const notes = require('../controllers/notes');
const Note = require('../models/note');
const authenticate = require('../middleware/authentication');
const catchAsyncErrors = require('../utilities/catchAsyncErrors'); // TODO: May not need if I use tiny's storage

const router = express.Router();

router.route('/')
    .get(/*authenticate.isLoggedIn, */notes.showAll);

router.route('/new', authenticate.isLoggedIn, notes.create);

router.route('/:id')
    .get(notes.edit)
    .put(authenticate.isOwner, notes.save) // TODO: May not use put in using tiny cloud
    .delete(authenticate.isOwner, notes.delete);

module.exports = router;
