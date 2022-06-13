const Note = require('../models/note');

module.exports.showAll = (request, response) => {
    const notes = []; // TODO: Load notes from db or tiny cloud; likely async
    response.render('note/showAll', {notes});
};

// module.exports.create = (request, response) => {};

module.exports.edit = (request, response) => {
    const note = null; // TODO: Load note from db or tiny cloud; likely async
    response.render('note/edit', {note});
};

module.exports.save = (request, response) => {
    // TODO: Not sure if I need this unless I store in mongo
};

module.exports.delete = (request, response) => {
    // TODO: Remove from db or tiny; likely async
    request.flash('succuss', 'Successfully deleted note.')
    response.redirect('/notes');
};