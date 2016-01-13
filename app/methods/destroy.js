'use strict'
const joi = require('joi')

module.exports = function(ms, opts) {
  let Session = ms.plugins.models.Session;

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        sid: joi.string().required(),
      },
    },
    handler(params) {
      return Session.remove({
        _id: params.sid,
      })
    },
  })
}

module.exports.attributes = {
  name: 'destroy',
}
