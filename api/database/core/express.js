const config = require('../config/config');
const express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var httpStatus = require('http-status');
var helmet = require('helmet');

var expressValidation = require('express-validation');
var expressWinston = require('express-winston');
var winstonInstance = require('./winston');
var responseHandler = require('express-response-handler');
var i18n = require("i18n");
var i18nConfig = require('../config/i18n');
var app = express();

var routes = require('../routes/index.route');


// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());


// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(responseHandler());

i18n.configure(i18nConfig);
app.use(i18n.init);

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}


app.use('/', routes);
module.exports = app;
