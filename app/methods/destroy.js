'use strict';

module.exports = function(ms) {
  var Session = ms.models.Session;

  return function(sid, cb) {
    Session.remove({
      _id: sid
    }, cb);
  };
};
