const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Certification = require('../models/certification');
const User = require('../models/user');
const Job = require('../models/job');
const Message = require('../models/message');

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => {

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

    return Certification
      .create(certificationData);
  })
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
      name: 'Jess',
      email: 'jess@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www2.padi.com/blog/wp-content/uploads/2016/06/JessicaAlba-scuba.png',
      center: false,
      certLv: certLvls[0]
    }, {
      // Center
      name: 'Da Nang Scuba',
      email: 'grant@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://danangscuba.com/staging/wp-content/uploads/2016/04/danang-scuba-logo-1.png',
      center: true,
      address: '40, Lê Lộ, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Vietnam',
      iso: 'VN',
      country: 'Viet Nam',
      region: 'Asia',
      location: {
        lat: 16.0535926,
        lng: 108.2450331
      }
    }, {
      name: 'Dive Center Manly',
      email: 'tricky@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.divesydney.com.au/wp-content/uploads/2014/07/logo.jpg',
      center: true,
      address: '10 Belgrave St, Manly NSW 2095, Australia',
      iso: 'AU',
      country: 'Australia',
      region: 'Oceania',
      location: {
        lat: -33.797362,
        lng: 151.282842
      }
    }, {
      name: 'Atlantis Diving Gozo',
      email: 'steph@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.gozo-tauchen.de/atlan3.JPG',
      center: true,
      address: 'Triq Il-Qolla Is-Safra, Marsalforn, Gozo, Iż-Żebbuġ MFN 1405, Malta',
      iso: 'MT',
      country: 'Malta',
      region: 'Europe',
      location: {
        lat: 36.0728912,
        lng: 14.2544883
      }
    }, {
      name: 'Latchi Watersports Centre',
      email: 'mark@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.latchiwatersportscentre.com/wp-content/uploads/2016/02/logo-latchi-watersports-3.png',
      center: true,
      address: 'Latchi Lighthouse, Poli Crysochous 8830, Cyprus',
      iso: 'CY',
      country: 'Cyprus',
      region: 'Europe',
      location: {
        lat: 35.040948,
        lng: 32.3940697
      }
    }, {
      name: 'Bans Diving Resort',
      email: 'suzanne@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.bansdivingresortkohtao.com/images/logo-bans-3.png',
      center: true,
      address: 'Ko Tao, อำเภอ เกาะพงัน Surat Thani 84360, Thailand',
      iso: 'TH',
      country: 'Thailand',
      region: 'Asia',
      location: {
        lat: 10.095895,
        lng: 99.8256273
      }
    }, {
      name: 'Flipper Diving Club',
      email: 'willy@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.flipperdiving.com/Vietnam/wp-content/uploads/2014/09/logo-flipper-diving-club-vietnam-phu-quoc-420.png',
      center: true,
      address: '60 Trần Hưng Đạo, Khu 1, tt. Dương Đông, Tp. Phú Quốc, tỉnh Kiên Giang, Vietnam',
      iso: 'VN',
      country: 'Viet Nam',
      region: 'Asia',
      location: {
        lat: 10.2124674,
        lng: 103.9591652
      }
    }, {
      name: 'World Diving Lembongan',
      email: 'steve@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.world-diving.com/wp-content/uploads/2015/04/worlddiving-lembongan-403x70.png',
      center: true,
      address: 'Pondok Baruna, Jungutbatu, Nusapenida, Kabupaten Klungkung, Bali 80771, Indonesia',
      iso: 'ID',
      country: 'Indonesia',
      region: 'Asia',
      location: {
        lat: -8.673104,
        lng: 115.447284
      }
    }, {
      name: 'Sundive Byron Bay',
      email: 'sundive@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://www.sundive.com.au/wp-content/uploads/2016/10/logo-sundive-byron-bay-250.jpg',
      center: true,
      address: '11/8 Middleton St, Byron Bay NSW 2481, Australia',
      iso: 'AU',
      country: 'Australia',
      region: 'Oceania',
      location: {
        lat: -28.643716,
        lng: 153.6128833
      }
    }, {
      name: 'Jetty Dive',
      email: 'maye@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://jettydive.com.au/wp-content/uploads/2014/10/jetty-logo.png',
      center: true,
      address: '398 Harbour Dr, Coffs Harbour NSW 2450, Australia',
      iso: 'AU',
      country: 'Australia',
      region: 'Oceania',
      location: {
        lat: -30.30386,
        lng: 153.135593
      }
    }, {
      name: 'Johns Diving Charters',
      email: 'john@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://www.scapaflow.com/templates/Base_Template/images/header-object.png',
      center: true,
      address: 'Polrudden House, Peerie Sea Loan, Kirkwall, Orkney, KW15 1UH',
      iso: 'GB',
      country: 'United Kingdom',
      region: 'Europe',
      location: {
        lat: 58.98462,
        lng: -2.9745852
      }
    }, {
      name: 'London School of Diving',
      email: 'farmer@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://i2.wp.com/abbottsgroup.co.uk/wp-content/uploads/2015/02/Abbotts-Group-London-School-of-Diving.jpg',
      center: true,
      address: '11 Power Rd, Chiswick, London W4 5PT',
      iso: 'GB',
      country: 'United Kingdom',
      region: 'Europe',
      location: {
        lat: 51.4936916,
        lng: -0.2810607
      }
    }, {
      name: 'Go Dive',
      email: 'beau@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://divescover.com/images/center/2/1/6/3/5/21635_b.jpg',
      center: true,
      address: 'Shop 5/178 Albion Rd, Windsor QLD 4030, Australia',
      iso: 'AU',
      country: 'Australia',
      region: 'Oceania',
      location: {
        lat: -27.429123,
        lng: 153.0312413
      }
    }];
    return User
      .create(userData)
      .then(users => {
        console.log(`${users.length} users created!`);
        const jobData = [{
          center: users[2],
          reqCertLv: certLvls[1],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[3],
          reqCertLv: certLvls[5],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }, {
          center: users[4],
          reqCertLv: certLvls[4],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[5],
          reqCertLv: certLvls[0],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }, {
          center: users[6],
          reqCertLv: certLvls[2],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[7],
          reqCertLv: certLvls[2],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }, {
          center: users[8],
          reqCertLv: certLvls[1],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[9],
          reqCertLv: certLvls[5],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }, {
          center: users[10],
          reqCertLv: certLvls[4],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[11],
          reqCertLv: certLvls[0],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }, {
          center: users[12],
          reqCertLv: certLvls[4],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          center: users[13],
          reqCertLv: certLvls[0],
          description: 'Nostrud tibique eos cu, nullam consectetuer eu sea. Ex vis minim everti, vis in veniam euismod nonumes, eum in novum tincidunt. Has atqui possit scriptorem an, pri no fastidii reformidans, id epicuri invenire definiebas usu. Cu magna suscipiantur per, verear postulant mediocrem ea cum.'
        }];
        return Job
          .create(jobData)
          .then(jobs => {
            console.log(`${jobs.length} jobs created!`);
            const messageData = [{
              from: users[0],
              to: users[2],
              text: 'Hi, I see you\'re looking for OWSI\'s to join your team in Vietnam.  I\'m interested!',
              read: false
            }, {
              from: users[2],
              to: users[0],
              text: 'Hi Josh, that\'s great, have you got experience diving in Asia?',
              read: false
            }, {
              from: users[0],
              to: users[2],
              text: 'Yes',
              read: false
            }, {
              from: users[2],
              to: users[0],
              text: 'Make haste! Our center will surely fail without you!',
              read: false
            }, {
              from: users[0],
              to: users[5],
              text: 'Hi, I see you\'re looking for OWSI\'s to join your team.  I\'m interested!',
              read: false
            }, {
              from: users[5],
              to: users[0],
              text: 'Hi Josh, thanks for your interest, when can you start?',
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
