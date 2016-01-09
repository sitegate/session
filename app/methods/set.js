'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Session = ms.models.Session

  ms.method({
    name: 'destroy',
    config: {
      validate: {
        sid: joi.string().required(),
        session: joi.object().required(),
      },
    },
    handler(params, cb) {
      /* shouldn't resave session that was intentionally removed */
      let upsert = !params.session.isExisting

      let s = {
        data: params.session,
        expires: params.session.expires,
        lastModified: new Date(),
      }

      delete s.data.expires
      delete s.data.isExisting

      Session.update({
        _id: params.sid,
      }, s, {
        upsert: upsert,
        safe: true,
      }, cb)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'destroy',
}
