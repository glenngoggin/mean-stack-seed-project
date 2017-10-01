import config from '../config/config';

module.exports = {
  development : config.mongo.host,
  test        : config.mongo.host,
  production  : config.mongo.host
}