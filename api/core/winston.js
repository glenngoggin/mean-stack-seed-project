const config = require('../config/config');
const winston = require('winston');

require('winston-mongodb').MongoDB;

const logger = new (winston.Logger)({
  transports: [
    new(winston.transports.MongoDB)({
        db : config.mongo.host,
        collection: 'logs'
    })
  ]
});

module.exports = logger;