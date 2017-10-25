const Job = require('../models/job');

function jobsIndex(req, res, next) {
  Job
    .find()
    .populate('center reqCertLv')
    .exec()
    .then(jobs => res.status(200).json(jobs))
    .catch(next);
}

function jobsCreate(req, res, next) {
  Job
    .create(req.body)
    .then(job => res.status(201).json(job))
    .catch(next);
}

function jobsShow(req, res, next) {
  Job
    .findById(req.params.id)
    .populate('center reqCertLv')
    .exec()
    .then(job => {
      if(!job) return res.notFound();
      res.status(200).json(job);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function jobsUpdate(req, res, next) {
  Job
    .findById(req.params.id)
    .exec()
    .then(job => {
      if(!job) return res.notFound();
      job = Object.assign(job, req.body);
      return job.save();
    })
    .then(job => res.json(job))
    .catch(next);
}

function jobsDelete(req, res, next) {
  Job
    .findById(req.params.id)
    .exec()
    .then(job => {
      if(!job) return res.notFound();
      return job.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: jobsIndex,
  create: jobsCreate,
  show: jobsShow,
  update: jobsUpdate,
  delete: jobsDelete
};
