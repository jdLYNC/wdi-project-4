const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const locationSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
});

const userSchema = new mongoose.Schema({
  // Shared user values (all required values)
  name: { type: String, required: 'Username is required' },
  email: { type: String, required: 'Email is required', unique: 'That email has already been taken' },
  password: { type: String, required: 'Password is required' },
  image: { type: String },
  center: { type: Boolean, required: true },
  // Diver specific values
  certLv: { type: mongoose.Schema.ObjectId, ref: 'Certification' },
  // Center specific values
  address: { type: String },
  location: locationSchema
}, {
  timestamps: true
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
