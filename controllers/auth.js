const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

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

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  register,
  login,
  profile,
  usersShow
};
