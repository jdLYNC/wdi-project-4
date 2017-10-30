const router = require('express').Router();
const jobs = require('../controllers/jobs');
const certifications = require('../controllers/certifications');
const messages = require('../controllers/messages');
const auth  = require('../controllers/auth');
const userRoute = require('../lib/secureRoute');

router.route('/jobs')
  .get(jobs.index)
  .post(userRoute(false), jobs.create);

router.route('/jobs/:id')
  .get(jobs.show)
  .put(userRoute(false), jobs.update)
  .delete(userRoute(false), jobs.delete);

router.route('/certifications')
  .get(certifications.index);

router.route('/certifications/:id')
  .get(certifications.show);

router.route('/messages')
  .get(userRoute(true), messages.index)
  .post(userRoute(true), messages.create);

router.route('/messages/:id')
  .delete(userRoute(true), messages.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/profile')
  .get(userRoute(true), auth.profile);

router.route('/users/:id')
  .get(userRoute(true), auth.usersShow);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
