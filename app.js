var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConnection = require('./database/conexion');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehiculosRouter = require('./routes/vehiculos');
var vehiculosAPIRouter = require('./routes/api/vehiculos');
var vehiculosAPI2Router = require('./routes/api2/vehiculos');
var vehiculosAPI3Router = require('./routes/api3/vehiculo');
var usuariosAPI3Router = require('./routes/api3/usuario');

var app = express();

dbConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehiculos', vehiculosRouter);
app.use('/api/vehiculos', vehiculosAPIRouter);
app.use('/api2/vehiculos', vehiculosAPI2Router);
app.use('/api3/vehiculos', vehiculosAPI3Router);
app.use('/api3/usuarios', usuariosAPI3Router);

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

module.exports = app;
