'use strict'
const joi = require('joi')

module.exports = function(ms, opts) {
  let Session = ms.plugins.models.Session

  ms.method({
    name: 'destroyByUserId',
    config: {
      validate: {
        userId: joi.string().required(),
        exceptId: joi.string(),
      },
    },
    handler(params) {
      return Session.remove({
        _id: { $ne: params.exceptId },
        'data.passport.user.id': params.userId,
      })
    },
  })
}

module.exports.attributes = {
  name: 'destroy-by-user-id',
}
