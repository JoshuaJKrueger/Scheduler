const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// TODO: Decide how I want the schema
// I want to allow logging in with email or password
//* username and password are taken care of by of passport
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
