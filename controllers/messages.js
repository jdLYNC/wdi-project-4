const Message = require('../models/message');

function messagesIndex(req, res, next) {
  Message
    .find({ $or:
      [{ to: req.currentUser.id }, { from: req.currentUser.id }]
    })
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

function messagesUpdate(req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => {
      if(!message) return res.notFound();
      message = Object.assign(message, req.body);
      return message.save();
    })
    .then(message => res.json(message))
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  delete: messagesDelete,
  update: messagesUpdate
};
