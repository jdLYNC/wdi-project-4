const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  center: { type: mongoose.Schema.ObjectId, ref: 'User' },
  reqCertLv: { type: mongoose.Schema.ObjectId, ref: 'Certification' },
  description: { type: String, required: 'Jobname is required' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
