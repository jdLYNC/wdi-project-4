/* global  describe, beforeEach, afterEach, it, api, expect */
const User = require('../../../models/user');
const Message = require('../../../models/message');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
require('../helper');

describe('DELETE /api/messages', () => {
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
    })
      .then(users => {
        messageData = {
          from: users[0],
          to: users[1],
          text: 'This message exists.',
          read: false
        };
        return Message.create(messageData, (err, message) => {
          Object.assign(messageData, { id: message.id });
        });
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
      .delete(`/api/messages/${messageData.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 204 response with token', done => {
    api
      .delete(`/api/messages/${messageData.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .expect(204, done);
  });

  it('should actually delete the record', done => {
    api
      .delete(`/api/messages/${messageData.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userData[0].token}`)
      .end(() => {
        Message.findById(messageData.id, (err, message) => {
          expect(message).to.be.null;
          done();
        });
      });
  });

});
