var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var albunsRouter = require('./routes/albunsRoutes');
var artistsRouter = require('./routes/artistsRoutes');
var customersRouter = require('./routes/customersRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/albuns', albunsRouter);
app.use('/api/artistas', artistsRouter);
app.use('/api/clientes', customersRouter);

module.exports = app;
