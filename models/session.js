/* jshint node:true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Session Schema
 */
var SessionSchema = new Schema({
  _id: String,
  data: {},
  expires: {
    type: Date
  }
});

module.exports = mongoose.model('Session', SessionSchema);