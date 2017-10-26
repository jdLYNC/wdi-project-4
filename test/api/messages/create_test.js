/* global  describe, beforeEach, afterEach, it, api, expect */
const User = require('../../../models/user');
const Message = require('../../../models/message');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
require('../helper');

describe('POST /api/messages', () => {
  let userData = null;
  let messageData = null;

  beforeEach(done => {
    userData = [{
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
    }];
    User.create(userData, (err, users) => {
      users.map((user, i) => {
        Object.assign(userData[i],
          { id: user.id,
            token: jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' })
          });
      });
      messageData = {
        to: userData[0].id,
        from: userData[1].id,
        text: 'This is a new message!',
        read: false
      };
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
      .post('/api/messages')
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 201 response with token', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .send(messageData)
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .send(messageData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data types', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .send(messageData)
      .end((err, res) => {
        const message = res.body;
        expect(message.id).to.be.a('string');
        expect(message.from).to.be.an('string');
        expect(message.to).to.be.an('string');
        expect(message.text).to.be.a('string');
        expect(message.read).to.be.a('boolean');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .send(messageData)
      .end((err, res) => {
        const message = res.body;
        expect(message.to).to.equal(messageData.to);
        expect(message.from).to.equal(messageData.from);
        expect(message.text).to.equal(messageData.text);
        expect(message.read).to.equal(messageData.read);
        done();
      });
  });

});
