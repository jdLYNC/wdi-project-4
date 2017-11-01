const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  center: { type: mongoose.Schema.ObjectId, ref: 'User' },
  reqCertLv: { type: mongoose.Schema.ObjectId, ref: 'Certification', required: 'Please indicate the required instructor level' },
  description: { type: String, required: 'A job description is required' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
