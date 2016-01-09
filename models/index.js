'use strict'
const debug = require('debug')('sitegate:session')
const mongoose = require('mongoose')

module.exports = function(service, opts, next) {
  if (!opts.mongoURI)
    return next(new Error('mongoURI is required'))

  let connection = mongoose.createConnection(opts.mongoURI)

  connection.on('connected', () => debug('Mongoose connected in Session microservice'))

  service.expose({
    Session: require('./session')(connection),
  })

  next()
}

module.exports.attributes = {
  name: 'models',
}
