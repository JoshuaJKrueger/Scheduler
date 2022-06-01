/*
    A class to make errors work nicely with the 
*/
// TODO: I don't think I actually want to use this, just use Error
class ExpressError extends Error {
    constructor (message, statusCode) {
        super();

        this.message = message;
        this. statusCode = statusCode;
    }
}

module.exports = ExpressError;
