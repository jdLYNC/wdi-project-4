/* global  describe, beforeEach, afterEach, it, api, expect */
require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const Certification = require('../../../models/certification');
const User = require('../../../models/user');
const Job = require('../../../models/job');

describe('PUT /api/jobs/:id', () => {
  let certificationData = null;
  let userData = null;
  let jobData = null;
  let _job = null;
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
        })
          .then(users => {
            jobData = {
              center: users[1],
              reqCertLv: cert,
              description: 'Original description'
            };
            return Job.create(jobData, (err, job) => {
              _job = job;
            });
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
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .send({ description: 'This description has been edited!' })
      .expect(401, done);
  });

  it('should return a 401 response with a normal user token', done => {
    api
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ description: 'This description has been edited!' })
      .expect(401, done);
  });

  it('should return a 200 response with a center token', done => {
    api
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send({ description: 'This description has been edited!' })
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send({ description: 'This description has been edited!' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send({ description: 'This description has been edited!' })
      .end((err, res) => {
        const job = res.body;
        expect(job.id).to.be.a('string');
        expect(job.center).to.be.a('string');
        expect(job.reqCertLv).to.be.a('string');
        expect(job.description).to.be.a('string');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .put(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${centerToken}`)
      .send({ description: 'This description has been edited!' })
      .end((err, res) => {
        const job = res.body;
        expect(job.id).to.equal(_job.id);
        expect(job.center).to.equal(_job.center.id);
        expect(job.reqCertLv).to.equal(_job.reqCertLv.id);
        expect(job.description).to.equal('This description has been edited!');
        done();
      });
  });

});
