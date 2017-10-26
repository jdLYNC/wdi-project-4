/* global  describe, before, after, it, api, expect, mongoose */
require('../helper');

const Certification = require('../../../models/certification');

describe('GET /api/certifications/:id', () => {
  const certificationData = {
    title: 'Divemaster',
    abbr: 'DM',
    level: 0
  };

  before(done => {
    Certification.create(certificationData, (err, cert) => {
      Object.assign(certificationData, { id: cert.id });
      done();
    });
  });

  after(done => {
    Certification.remove(done);
  });

  it('should return a valid id', done => {
    api
      .get(`/api/certifications/${certificationData.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(mongoose.Types.ObjectId.isValid(res.body.id)).to.deep.equal(true);
        done();
      });
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/certifications/${certificationData.id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/api/certifications/${certificationData.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .get(`/api/certifications/${certificationData.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const cert = res.body;
        expect(cert.id).to.be.a('string');
        expect(cert.title).to.be.an('string');
        expect(cert.abbr).to.be.an('string');
        expect(cert.level).to.be.a('number');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/certifications/${certificationData.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const cert = res.body;
        expect(cert.id).to.equal(certificationData.id);
        expect(cert.title).to.equal(certificationData.title);
        expect(cert.abbr).to.equal(certificationData.abbr);
        expect(cert.level).to.equal(certificationData.level);
        done();
      });
  });

});
