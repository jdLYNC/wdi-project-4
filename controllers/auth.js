const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: `Thanks for joining Diveboard ${req.body.name}, enter your details up top to log in!` }))
    .catch(next);
}

function login(req, res, next) {

  if(!req.body.email) return res.status(400).json({
    field: 'email', message: 'Please enter email'
  });
  if(!req.body.password) return res.status(400).json({
    field: 'password', message: 'Please enter password'
  });

  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ field: 'login', message: 'Email & password not recognized' });

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      return res.status(200).json({ message: `Welcome back ${user.name}`, token, user });
    })
    .catch(next);
}

function profile(req, res, next) {
  User
    .findById(req.currentUser.id)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

module.exports = {
  register,
  login,
  profile
};
