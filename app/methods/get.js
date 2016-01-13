'use strict'
const joi = require('joi')

module.exports = function(ms, opts) {
  let Session = ms.plugins.models.Session

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        sid: joi.string().required(),
      },
    },
    handler(params) {
      return Session.findById(params.sid).exec().then(s => {
        if (!s)
          return Promise.resolve()

        s.data = s.data || {}

        // Is existing is used to identify if the session
        // will have to be created or updated.
        // Upsert is not used to avoid resaving sessions that
        // were deleted.
        s.data.isExisting = true

        return Promise.resolve(s.data)
      })
    },
  })
}

module.exports.attributes = {
  name: 'destroy',
}
