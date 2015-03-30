'use strict';

var Session = require('../../models/session');

module.exports = function (sid, cb) {
  Session.remove({
    _id: sid
  }, cb);
};