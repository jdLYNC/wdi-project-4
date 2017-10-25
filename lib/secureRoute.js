const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

// Factory function, if this is a user route (ie. yes === true) then run secure route as normal.  If this is a center route (ie. yes === false) then run line 21 (return unauthorized if user.center === false)
function userRoute(yes) {

  return function secureRoute(req, res, next) {
    if(!req.headers.authorization) return res.unauthorized();

    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verifyAsync(token, secret)
      .then((payload) => {
        return User.findById(payload.userId);
      })
      .then((user) => {
        if(!user) return res.unauthorized();
        req.currentUser = user;
        if(!yes) if(!user.center) return res.unauthorized();
        return next();
      })
      .catch(next);
  };

}

module.exports = userRoute;
