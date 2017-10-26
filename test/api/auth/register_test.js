/* global api, describe, it, expect, after */
require('../helper');

const User = require('../../../models/user');

const userData = {
  // Diver
  name: 'Josh',
  email: 'josh@ga.co',
  password: 'memory',
  passwordConfirmation: 'memory',
  center: false
};

describe('POST /api/register', () => {

  after(done => {
    User.remove(done);
  });

  it('should return a 422 response with incorrect details', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ email: 'bad', password: 'bad' })
      .expect(422, done);
  });

  it('should return a 200 response', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userData)
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should create a user object', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userData)
      .end(() => {
        User.findOne({ email: userData.email }, (err, user) => {
          expect(user).to.be.an('object');
          expect(user.username).to.equal(userData.username);
          expect(user.email).to.equal(userData.email);
          done();
        });
      });
  });
});
