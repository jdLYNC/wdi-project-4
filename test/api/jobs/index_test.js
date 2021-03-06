/* global  describe, before, after, it, api, expect, mongoose */
require('../helper');

const Certification = require('../../../models/certification');
const User = require('../../../models/user');
const Job = require('../../../models/job');

describe('GET /api/jobs', () => {
  let certificationData = null;
  let userData = null;
  let jobData = null;

  before(done => {
    certificationData = [{
      title: 'Divemaster',
      abbr: 'DM',
      level: 0
    }, {
      title: 'Open Water Scuba Instructor',
      abbr: 'OWSI',
      level: 2
    }];
    Certification.create(certificationData)
      .then(certs => {
        userData = [{
          // Diver
          name: 'Josh',
          email: 'josh@ga.co',
          password: 'memory',
          passwordConfirmation: 'memory',
          image: 'https://i.imgur.com/XOXYjzJ.jpg',
          center: false,
          certLv: certs[1]
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
        return User.create(userData)
          .then(users => {
            jobData = [{
              center: users[1],
              reqCertLv: certs[0],
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }, {
              center: users[1],
              reqCertLv: certs[1],
              description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
            }];
            return Job.create(jobData);
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

  it('should return a 200 response', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map(job => expect(job).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const jobs = res.body;
        jobs.map(job => {
          expect(job.id).to.be.a('string');
          expect(job.center).to.be.an('object');  // Populated data
          expect(job.reqCertLv).to.be.an('object');  // Populated data
          expect(job.description).to.be.a('string');
        });
        done();
      });
  });

  it('should return valid ids', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map(job => {
          expect(mongoose.Types.ObjectId.isValid(job.id)).to.deep.equal(true);
        });
        done();
      });
  });

  it('should return the correct description', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map((job, i) => {
          expect(job.description).to.equal(jobData[i].description);
        });
        done();
      });
  });

});
