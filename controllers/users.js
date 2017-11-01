const User = require('../models/user');

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
  show: usersShow
};
