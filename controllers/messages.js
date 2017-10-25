const Message = require('../models/message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .populate('to from')
    .exec()
    .then(messages => res.json(messages))
    .catch(next);
}

function messagesCreate(req, res, next) {
  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

function messagesDelete(req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove())
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  delete: messagesDelete
};
