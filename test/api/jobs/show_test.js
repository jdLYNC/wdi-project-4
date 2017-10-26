/* global  describe, before, after, it, api, expect, mongoose */
require('../helper');

const Certification = require('../../../models/certification');
const User = require('../../../models/user');
const Job = require('../../../models/job');

describe('GET /api/jobs/:id', () => {
  let certificationData = null;
  let userData = null;
  let jobData = null;
  let _job = null;

  before(done => {
    certificationData = [{
      title: 'Open Water Scuba Instructor',
      abbr: 'OWSI',
      level: 2
    }];
    Certification.create(certificationData)
      .then(certs => {
        userData = [{
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
        return User.create(userData)
          .then(users => {
            jobData = {
              center: users[0],
              reqCertLv: certs[0],
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            };
            return Job.create(jobData, (err, job) => {
              _job = job;
            });
          });
      })
      .then(() => done())
      .catch(done);
  });

  after(done => {
    Job.remove()
      .then(() => User.remove())
      .then(() => Certification.remove())
      .then(() => done())
      .catch(done);
  });

  it('should return a valid id', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end(() => {
        expect(mongoose.Types.ObjectId.isValid(_job.id)).to.deep.equal(true);
        done();
      });
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .get(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const job = res.body;
        expect(job.id).to.be.a('string');
        expect(job.center).to.be.an('object');  // Populated data
        expect(job.reqCertLv).to.be.an('object');  // Populated data
        expect(job.description).to.be.a('string');
        done();
      });
  });

  it('should return the correct description', done => {
    api
      .get(`/api/jobs/${_job.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const job = res.body;
        expect(job.description).to.equal(jobData.description);
        done();
      });
  });

});
