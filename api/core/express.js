/** 
  * IMPORTS
*/

const config = require('../config/config');
const express = require('express');

var i18nConfig = require('../config/i18n');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var httpStatus = require('http-status');
var helmet = require('helmet');
var responseHandler = require('express-response-handler');
var i18n = require('i18n');
var expressWinston = require('express-winston');
var winstonInstance = require('./winston');
i18n.configure(i18nConfig);
const app = express();

/** 
  * ROUTES
*/
const routes = require('../routes/index.route');


/** 
  * MIDDLEWARE
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(responseHandler());
app.use(i18n.init);
app.use('/', routes);

/** 
  * LOGGING
*/

if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'
    }));
  }

/** 
  * ERROR Handling
*/

// 404
app.use(function (req, res, next) {
  const err = new Error('Not found');
  err.status = httpStatus.NOT_FOUND;
  next(err);
});


// Error Handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) {
    res.error.NotFound('API Endpoint not found', err);
  }

  else if (err.status === 400) {
    res.error.BadRequest('Oops, we have encountered a validation error', err);
  }

  else {
    res.error.Default(err.message, err);
  }

   if (config.env === 'development') {
    console.log(err);
   }
});

module.exports = app;