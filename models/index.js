'use strict';

var mongoose = require('mongoose');

module.exports = function(mongoURI) {
  var connection = mongoose.createConnection(mongoURI);

  connection.on('connected', function() {
    console.log('Mongoose connected in Session microservice');
  });

  var models = {
    Session: require('./session')(connection)
  };

  return models;
};
