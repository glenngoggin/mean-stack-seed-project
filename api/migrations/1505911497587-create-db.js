'use strict';
const config = require("../config/config");
var MongoClient = require('mongodb').MongoClient;
var database = config.mongo.host;

  exports.up = function(next){
    MongoClient.connect(database, function(err, db) {
      if (err) throw err;
      console.log(`Database:${database} created`);
      db.close();
    });
  };

  exports.down = function(next){
       
  };
