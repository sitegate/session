'use strict';

var Session = require('../../models/session');

module.exports = function (sid, cb) {
  Session.findById(sid, function (err, s) {
    if (err) {
      return cb(err);
    }
    if (!s) {
      return cb(new Error('No session found'));
    }

    cb(null, s.data);
  });
};