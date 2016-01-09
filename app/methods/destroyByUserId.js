'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Session = ms.plugins.models.Session

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        userId: joi.string().required(),
      },
    },
    handler(params, cb) {
      Session.remove({
        _id: { $ne: params.exceptId },
        'data.passport.user.id': params.userId,
      }, cb)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'destroy',
}
