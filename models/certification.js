const mongoose = require('mongoose');

const certificationSchema = mongoose.Schema({
  title: { type: String, required: true },
  abbr: { type: String, required: true },
  level: { type: Number, required: true }
});

module.exports = mongoose.model('Certification', certificationSchema);
