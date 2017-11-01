const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');

const locationSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
});

const userSchema = new mongoose.Schema({
  // Shared user values
  name: { type: String, required: 'Please provide a name' },
  email: { type: String,
    required: 'Please provide an email',
    unique: 'That email has already been taken'
  },
  password: { type: String },
  center: { type: Boolean, required: 'Please confirm account type', default: false },
  // Diver specific values
  facebookId: { type: Number },
  certLv: { type: mongoose.Schema.ObjectId, ref: 'Certification' },
  // Center specific values
  image: { type: String },
  address: { type: String },
  iso: { type: String },
  country: { type: String },
  region: { type: String },
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
  if(!this.password && !this.facebookId) {
    this.invalidate('password', 'Password is required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
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

userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

userSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
