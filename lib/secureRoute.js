const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

// Factory function, if this is a user route (ie. bool === true) then run secure route as normal.  If this is a center route (ie. bool === false) then run line 21 (return unauthorized if user.center === false)
function userRoute(bool) {

  return function secureRoute(req, res, next) {
    console.log('absent headers');
    if(!req.headers.authorization) return res.unauthorized();

    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verifyAsync(token, secret)
      .then((payload) => {
        return User.findById(payload.userId);
      })
      .then((user) => {
        console.log('absent user');
        if(!user) return res.unauthorized();
        req.currentUser = user;
        console.log('not a center');
        if(!bool) if(!user.center) return res.unauthorized();
        return next();
      })
      .catch(next);
  };

}

module.exports = userRoute;
