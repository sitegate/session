'use strict';

module.exports = function(ms) {
  var Session = ms.models.Session;

  return function(userId, exceptId, cb) {
    Session.remove({
      _id: { $ne: exceptId },
      'data.passport.user.id': userId
    }, cb);
  };
};
