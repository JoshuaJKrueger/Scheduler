/*--------------- Requires ---------------*/
// Packages
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const localStrategy = require('passport-local');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const mongoStore = require('connect-mongo');

// Models
const User = require('./models/user');
const Task = require('./models/task');

// Routes
const userRoutes = require('./routes/users');

// Custom
const ExpressError = require('./utilities/ExpressError');

// Node Modules
const path = require('path');
/*--------------- Requires END ---------------*/

/*--------------- Data Base ---------------*/
mongoose.connect(process.env.DB_URL); // TODO: See options

mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'));

const store = mongoStore.create({
    mongoUrl: process.env.DB_URL,
    secret: process.env.SECRET,
    touchAfter: 24 * 60 * 60 // TODO: See options and change time
});

store.on('error', (error) => { console.log(`Session store error:\n\t${error}`) }); // TODO: Can console.error.bind be used
/*--------------- Data Base END ---------------*/

/*--------------- Application ---------------*/
const application = express();

application.engine('ejs', ejsMate);

application.set('view engine', 'ejs');
application.set('views', path.join(__dirname, 'views'));

application.use(session({ // TODO: See options
    store,
    name: 'sID',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, localhost is not https
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

application.use(express.urlencoded({ extended: true }));
application.use(methodOverride('_method'));
application.use(express.static(path.join(__dirname, 'public')));
application.use(mongoSanitize({ replaceWith: '_' }));
application.use(flash());
application.use(helmet());
application.use(passport.initialize());
application.use(passport.session());

// Authentication
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 
application.use((request, response, next) => { // TODO: Update comment
    response.locals.currentUser = request.user;
    response.locals.success = request.flash('Success');
    response.locals.error = request.flash('Error');

    next();
});

// Routes
application.use('/', userRoutes);
//? Task routes

// TODO: Use catchAsync
application.get('/', async (request, response) => {
    const tasks = await Task.find({});
    response.render('home', { tasks });
});

// Catch all other routes
application.all('*', (request, response, next) => { next(new ExpressError('Page not found.', 404)) });

// Catching unhandled error and displaying them
// TODO: Be able to pass in redirect page to just flash the error
application.use((error, request, response, next) => {
    // TODO: Go to custom pages for different error types
    response.status(error.statusCode || 500).send(error.message || 'Something went wrong.');
});

application.listen(process.env.PORT);
/*--------------- Application END ---------------*/
