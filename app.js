var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var search = require('./routes/search');
var highscores = require('./routes/highscores');
var user = require('./routes/user');
var compression = require('compression');
var helmet = require('helmet');

// Create the Express application object
var app = express();
var acceptedHosts = ['mspstats.co', 'www.mspstats.co'];
var i18n = require('i18n-x');
var maintenance = false;

app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  if(acceptedHosts.indexOf(req.get('host')) == -1)
    return;
  next();
})

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Locales
app.use(cookieParser());
app.use(i18n({
  locales: ['en', 'tr']
}));

app.use(function(req, res, next) {
  req.i18n.setLocale(req.cookies.mspstats_lang || 'en');
  next(); 
});

app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
  if(maintenance)
    return res.render('maintenance');
  next();
})


app.use('/', index);
app.use('/search', search);
app.use('/user', user);
app.use('/highscores', highscores);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.i18n.__('404'));
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
