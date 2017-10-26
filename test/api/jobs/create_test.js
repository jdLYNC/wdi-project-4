/* global describe, beforeEach, afterEach, it, api, expect */

require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const Certification = require('../../../models/certification');
const User = require('../../../models/user');
const Job = require('../../../models/job');

describe('POST /api/jobs', () => {
  let certificationData = null;
  let userData = null;
  let jobData = null;
  let userToken = null;
  let centerToken = null;

  beforeEach(done => {
    certificationData = {
      title: 'Open Water Scuba Instructor',
      abbr: 'OWSI',
      level: 2
    };
    Certification.create(certificationData)
      .then(cert => {
        userData = [{
          // Diver
          name: 'Josh',
          email: 'josh@ga.co',
          password: 'memory',
          passwordConfirmation: 'memory',
          image: 'https://i.imgur.com/XOXYjzJ.jpg',
          center: false,
          certLv: cert
        }, {
          // Center
          name: 'Da Nang Scuba',
          email: 'grant@ga.co',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'http://danangscuba.com/staging/wp-content/uploads/2016/04/danang-scuba-logo-1.png',
          center: true,
          address: '40, Lê Lộ, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Vietnam',
          location: {
            lat: 16.0535926,
            lng: 108.2450331
          }
        }];
        return User.create(userData, (err, users) => {
          userToken = jwt.sign({ userId: users[0].id }, secret, { expiresIn: '1hr' });
          centerToken = jwt.sign({ userId: users[1].id }, secret, { expiresIn: '1hr' });
          jobData = {
            center: users[0].id,
            reqCertLv: cert.id,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          };
        });
      })
      .then(() => done())
      .catch(done);
  });

  afterEach(done => {
    Job.remove()
      .then(() => User.remove())
      .then(() => Certification.remove())
      .then(() => done())
      .catch(done);
  });

  it('should return a 401 response with no token', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .send(jobData)
      .expect(401, done);
  });

  it('should return a 401 response with a normal user token', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .send(jobData)
      .expect(401, done);
  });

  it('should return a 201 response with a center token', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send(jobData)
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send(jobData)
      .end((err, res) => {
        const job = res.body;
        expect(job.id).to.be.a('string');
        expect(job.center).to.be.a('string');  // Populated data
        expect(job.reqCertLv).to.be.a('string');  // Populated data
        expect(job.description).to.be.a('string');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/jobs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send(jobData)
      .end((err, res) => {
        const job = res.body;
        expect(job.description).to.equal(jobData.description);
        expect(job.center).to.equal(jobData.center);
        expect(job.reqCertLv).to.equal(jobData.reqCertLv);
        done();
      });
  });

});
