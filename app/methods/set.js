'use strict';

var Session = require('../../models/session');

module.exports = function (sid, session, options, cb) {
  var s = {
    data: session
  };

  if (session && session.cookie && session.cookie.expires) {
    s.expires = new Date(session.cookie.expires);
  } else {
    // If there's no expiration date specified, it is
    // browser-session cookie or there is no cookie at all,
    // as per the connect docs.
    //
    // So we set the expiration to two-weeks from now
    // - as is common practice in the industry (e.g Django) -
    // or the default specified in the options.
    s.expires = new Date(Date.now() + options.ttl * 1000);
  }

  if (options.touchAfter > 0) {
    s.lastModified = new Date();
  }

  // shouldn't resave session that was intentionally removed
  var upsert = !s.data.isExisting;
  delete s.data.isExisting;

  Session.update({
    _id: sid
  }, s, {
    upsert: upsert,
    safe: true
  }, cb);
};