/* global  describe, before, after, beforeEach, afterEach, it, api, expect */
require('../helper');

const Certification = require('../models/certification');
const User = require('../models/user');
const Job = require('../models/job');


describe('GET /api/jobs', () => {

  before(done => {
    const certificationData = [{
      title: 'Divemaster',
      abbr: 'DM',
      level: 0
    }, {
      title: 'Open Water Scuba Instructor',
      abbr: 'OWSI',
      level: 2
    }];
    Certification.create(certificationData,  (err, cert) => {
      const userData = [{
        // Diver
        name: 'Josh',
        email: 'josh@ga.co',
        password: 'memory',
        passwordConfirmation: 'memory',
        image: 'https://i.imgur.com/XOXYjzJ.jpg',
        center: false,
        certLv: cert[1]
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
      User.create(userData, (err, user) => {
        const jobData = [{
          center: user[1],
          reqCertLv: cert[1],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: user[1],
          reqCertLv: cert[0],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }];
        Job.create(jobData, done);
      });
    });
  });

  after(done => {
    Job.remove(done);
    User.remove(done);
    Certification.remove(done);
  });

  // beforeEach(done => {
  //   // Should something be removed from before hook and placed here?
  // });
  //
  // afterEach(done => {
  //   // Should something be removed from after hook and placed here?
  // });

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
          expect(job.center).to.be.a('string');  // Or an object if populating?
          expect(job.reqCertLv).to.be.a('string');  // Or an object if populating?
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
        // Does this regexp mean what I think it does?
        const checkIdValid = new RegExp(/^[0-9a-fA-F]{24}$/);
        res.body.map(job => expect(checkIdValid.test(job.id)).to.be(true));
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map((job, i) => {
          // Need to relocate job data outside of before loop, except for reference data?
          expect(job.center).to.equal(jobData[i].center);
          expect(job.reqCertLv).to.equal(jobData[i].reqCertLv);
          expect(job.description).to.equal(jobData[i].description);
          // Will the below return additional incorrect keys such as _id and timestamps?
          expect(Object.keys(job)).to.equal(Object.keys(jobData[i]).concat('id'));
        });
        done();
      });
  });

});
