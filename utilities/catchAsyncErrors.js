/*
    Function wrapper to catch async errors in functions
    Acts as a try catch
*/
module.exports = func => { return (request, response, next) => { func(request, response, next).catch(next); }; };
