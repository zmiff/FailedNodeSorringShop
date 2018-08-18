var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoStore = require('connect-mongo')(session); //this is used for storing cart in sessions in mongodb
var validator = require('express-validator');
var request = require('request');

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var omsRoutes = require('./routes/oms');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next){
  res.io = io;
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ //stores session in mongoDB
    mongooseConnection: mongoose.connection //here we set the mongoStore connection to the same as the existing connection so we dont have to open 2 connection.
  }),
  cookie: {maxAge: 180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated(); // login is now a global variable i can now use this variable in all my routes to check if logged in or not.
  res.locals.session = req.session; // from this we can access the session in all routes by the variable session;
  next();
});

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/oms', omsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//io stuff
/*
io.on('connection', function (socket) {
//send to everyone on connection
socket.emit('connected',{connected: "connected"});

socket.on('Accepted', function(data){
  socket.broadcast.emit(`Accepted${data.id}`, {status: 'okay'});
});
});
*/
module.exports = {app: app, server: server};
