'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Session = ms.plugins.models.Session

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        sid: joi.string().required(),
      },
    },
    handler(params, cb) {
      Session.findById(params.sid, function(err, s) {
        if (err) {
          return cb(err)
        }
        if (!s) {
          return cb()
        }

        s.data = s.data || {}

        // Is existing is used to identify if the session
        // will have to be created or updated.
        // Upsert is not used to avoid resaving sessions that
        // were deleted.
        s.data.isExisting = true

        cb(null, s.data)
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'destroy',
}
