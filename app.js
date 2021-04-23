// node modules 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");
const layout = require('express-ejs-layouts');
require("dotenv").config();

// local node modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');
var gameRouter = require('./routes/game');

var app = express();

// connect database
require('./db/connect_db');

// view engine setup
app.use(layout);
app.set("layout", "./layouts/main");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ----------------------------------------
// passport configuration
// ----------------------------------------
app.use(
    session({
        key: 'chat-app',
        secret: 'chat-app',
        store: new MongoStore({ url: process.env.DATABASE_URI })
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// ----------------------------------------
// set local variables 
// ----------------------------------------
app.use((req, res, next) => {
    res.locals.current_user = req.user;
    res.locals.danger = req.flash('danger');
    res.locals.success = req.flash('success');
    next();
});


app.use(indexRouter);
app.use(usersRouter);
app.use(chatRouter);
app.use(gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app.get('/', (req,res)=>{
//   res.render('/views/game')
// })

module.exports = app;