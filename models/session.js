'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let SessionSchema = new Schema({
  _id: String,
  data: {},
  expires: {
    type: Date,
  },
})

module.exports = function(connection) {
  return connection.model('Session', SessionSchema)
}
