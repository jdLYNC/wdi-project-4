const Certification = require('../models/certification');

function certificationsIndex(req, res, next) {
  Certification
    .find()
    .exec()
    .then(certifications => res.status(200).json(certifications))
    .catch(next);
}

function certificationsShow(req, res, next) {
  Certification
    .findById(req.params.id)
    .exec()
    .then(certification => {
      if(!certification) return res.notFound();
      res.status(200).json(certification);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  index: certificationsIndex,
  show: certificationsShow
};
