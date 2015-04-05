'use strict';

var Session = require('../../models/session');

module.exports = function (userId, exceptId, cb) {
  Session.remove({
    _id: { $ne: exceptId },
    'data.passport.user.id': userId
  }, cb);
};