'use strict';

var Session = require('../../models/session');

module.exports = function (sid, cb) {
  Session.findById(sid, function (err, s) {
    if (err) {
      return cb(err);
    }
    if (!s) {
      return cb();
    }

    s.data = s.data || {};
    
    // Is existing is used to identify if the session
    // will have to be created or updated.
    // Upsert is not used to avoid resaving sessions that
    // were deleted.
    s.data.isExisting = true;
    
    cb(null, s.data);
  });
};