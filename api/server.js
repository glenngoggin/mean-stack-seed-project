'use strict';
const config = require('./config/config');
var app = require('./core/express');
var mongoose = require('mongoose');
var Promise = require('bluebird'); 

connect()
.on('error', error)
.on('disconnected', connect)
.once('open', listen);

function listen () {
  app.listen(config.port);
  console.log('Express app started on port ' + config.port);
}

function connect () {
  return mongoose.connect(config.mongo.host, { useMongoClient: true, promiseLibrary: Promise });
}

function error(){
  console.log(`unable to connect to database: ${config.mongo.host}`);
}


module.exports = app;
