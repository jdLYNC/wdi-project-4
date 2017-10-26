/* global  describe, before, after, it, api, expect */
require('../helper');

const Certification = require('../../../models/certification');

describe('GET /api/certifications', () => {
  const certificationData = [{
    title: 'Divemaster',
    abbr: 'DM',
    level: 0
  }, {
    title: 'Open Water Scuba Instructor',
    abbr: 'OWSI',
    level: 2
  }];

  before(done => {
    Certification.create(certificationData, done);
  });

  after(done => {
    Certification.remove(done);
  });

  it('should return a 200 response', done => {
    api
      .get('/api/certifications')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/certifications')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api
      .get('/api/certifications')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map(cert => expect(cert).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .get('/api/certifications')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map(certification => {
          expect(certification.id).to.be.a('string');
          expect(certification.title).to.be.an('string');
          expect(certification.abbr).to.be.an('string');
          expect(certification.level).to.be.a('number');
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/certifications')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.map((certification, i) => {
          expect(certification.title).to.equal(certificationData[i].title);
          expect(certification.abbr).to.equal(certificationData[i].abbr);
          expect(certification.level).to.equal(certificationData[i].level);
        });
        done();
      });
  });

});
