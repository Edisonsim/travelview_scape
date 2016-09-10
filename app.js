var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var sessions = require('client-sessions');
var logger = require('morgan');
var flash = require('connect-flash');

var routes = require('./routes/routes')(passport);
var localOauth = require('./passport');


var app = express();


mongoose.connect('mongodb://localhost/psprtdb');

app.locals.pretty= true;
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions( {
  cookieName:     'session',
  secret:         '$sjsjsjel',
  duration:       60*60*1000,
  activeDuration: 5*60*1000
}));
app.use(flash());
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
localOauth(passport);

//routes
app.use('/', routes);

app.listen(3000);
