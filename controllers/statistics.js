const Statistic = require('../models/statistic');

module.exports.showAll = (request, response) => {
    const statistics = []; // TODO: Make async
    response.render('statistic/showAll', {statistics});
};

module.exports.create = (request, response) => {};

module.exports.edit = (request, response) => {
    const statistic = null; // TODO: Make async
    response.render('statistic/edit', {statistic});
};

module.exports.save = (request, response) => {
};

module.exports.delete = (request, response) => {
    // TODO: Finish and make async
    request.flash('succuss', 'Successfully deleted statistic.')
    response.redirect('/statistics');
};