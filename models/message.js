const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true },
  text: {
    type: String,
    required: true },
  read: {
    type: Boolean,
    required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
