const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

function userRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then(payload => {
      return User.findById(payload.userId);
    })
    .then(user => {
      if(!user) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

function centerRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then(payload => {
      return User.findById(payload.userId);
    })
    .then(user => {
      if(!user || !user.center) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

module.exports = {
  userRoute,
  centerRoute
};
