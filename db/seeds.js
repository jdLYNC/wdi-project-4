const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Certification = require('../models/certification');
const User = require('../models/user');
const Job = require('../models/job');
const Message = require('../models/message');

mongoose.connect(dbURI, { useMongoClient: true });

Certification.collection.drop();
User.collection.drop();
Job.collection.drop();
Message.collection.drop();

// All required certification data should come from seeds file
const certificationData = [{
  title: 'Divemaster',
  abbr: 'DM',
  level: 0
}, {
  title: 'Assistant Instructor',
  abbr: 'AI',
  level: 1
}, {
  title: 'Open Water Scuba Instructor',
  abbr: 'OWSI',
  level: 2
}, {
  title: 'Master Scuba Diver Trainer',
  abbr: 'MSDT',
  level: 3
}, {
  title: 'Staff Instructor',
  abbr: 'Staff',
  level: 4
}, {
  title: 'Course Director',
  abbr: 'CD',
  level: 5
}];

Certification
  .create(certificationData)
  .then(certLvls => {
    console.log(`${certLvls.length} certification levels created!`);
    const userData = [{
      // Diver
      name: 'Josh',
      email: 'josh@ga.co',
      password: 'memory',
      passwordConfirmation: 'memory',
      image: 'https://i.imgur.com/XOXYjzJ.jpg',
      center: false,
      certLv: certLvls[2]
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
    return User
      .create(userData)
      .then(users => {
        console.log(`${users.length} users created!`);
        const jobData = [{
          center: users[1],
          reqCertLv: certLvls[1],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[1],
          reqCertLv: certLvls[5],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }];
        return Job
          .create(jobData)
          .then(jobs => {
            console.log(`${jobs.length} jobs created!`);
            const messageData = [{
              from: users[1],
              to: users[0],
              text: 'Hi Josh, welcome to Diveboard!  Are you interested in working at Da Nang Scuba?',
              read: false
            }, {
              from: users[0],
              to: users[1],
              text: 'Hi Grant!  Yes I am!',
              read: false
            }];
            return Message
              .create(messageData)
              .then(messages => console.log(`${messages.length} messages created!`));
          });
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
