/* global  describe, beforeEach, afterEach, it, api, expect */
const User = require('../../../models/user');
const Message = require('../../../models/message');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
require('../helper');

describe('GET /api/messages', () => {
  let token1 = null;
  let token2 = null;
  let messageData = null;

  beforeEach(done => {
    const userData = [{
      name: 'Test Messager',
      email: 'messager@ga.co',
      password: 'test',
      passwordConfirmation: 'test',
      center: false
    }, {
      name: 'Message Tester',
      email: 'tester@ga.co',
      password: 'test',
      passwordConfirmation: 'test',
      center: true
    }, {
      name: 'Messageless Tester',
      email: 'nothing@ga.co',
      password: 'test',
      passwordConfirmation: 'test',
      center: false
    }];
    User.create(userData, (err, user) => {
      token1 = jwt.sign({ userId: user[0].id }, secret, { expiresIn: '1hr' });
      token2 = jwt.sign({ userId: user[2].id }, secret, { expiresIn: '1hr' });
    })
      .then(users => {
        messageData = [{
          from: users[0],
          to: users[1],
          text: 'To me',
          read: false
        }, {
          from: users[1],
          to: users[0],
          text: 'To you',
          read: false
        }, {
          from: users[0],
          to: users[1],
          text: 'To you',
          read: false
        }, {
          from: users[1],
          to: users[0],
          text: 'To me',
          read: false
        }];
        return Message.create(messageData);
      })
      .then(() => done())
      .catch(done);
  });

  afterEach(done => {
    User.remove()
      .then(() => Message.remove())
      .then(() => done())
      .catch(done);
  });

  it('should return a 401 response without token', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 200 response with token', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        res.body.map(message => expect(message).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        res.body.map(message => {
          expect(message.id).to.be.a('string');
          expect(message.from).to.be.an('object');
          expect(message.to).to.be.an('object');
          expect(message.text).to.be.a('string');
          expect(message.read).to.be.a('boolean');
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        res.body.map((message, i) => {
          expect(message.text).to.equal(messageData[i].text);
          expect(message.read).to.equal(false);
        });
        done();
      });
  });

  it('should return the correct number of messages', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        expect(res.body.length).to.equal(4);
        done();
      });
  });

  it('should return the correct number of messages (none)', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token2}`)
      .end((err, res) => {
        expect(res.body.length).to.equal(0);
        done();
      });
  });

});
