'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Session = ms.plugins.models.Session;

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        sid: joi.string().required(),
      },
    },
    handler(params, cb) {
      Session.remove({
        _id: params.sid,
      }, cb);
    },
  })

  next()
}

module.exports.attributes = {
  name: 'destroy',
}
