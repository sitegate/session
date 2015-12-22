'use strict';

module.exports = function(ms) {
  let Session = ms.models.Session;

  return function(sid, session, cb) {
    /* shouldn't resave session that was intentionally removed */
    let upsert = !session.isExisting;

    let s = {
      data: session,
      expires: session.expires,
      lastModified: new Date(),
    };

    delete s.data.expires;
    delete s.data.isExisting;

    Session.update({
      _id: sid
    }, s, {
      upsert: upsert,
      safe: true
    }, cb);
  };
};
