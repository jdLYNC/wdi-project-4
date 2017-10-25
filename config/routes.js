const router = require('express').Router();
const jobs = require('../controllers/jobs');
const certifications = require('../controllers/certifications');
const messages = require('../controllers/messages');
const auth  = require('../controllers/auth');
const { userRoute, centerRoute } = require('../lib/secureRoute');

router.route('/jobs')
  .get( jobs.index)
  .post(centerRoute, jobs.create);

router.route('/jobs/:id')
  .get(jobs.show)
  .put(centerRoute, jobs.update)
  .delete(centerRoute, jobs.delete);

router.route('/certifications')
  .get(certifications.index);

router.route('/certifications/:id')
  .get(certifications.show);

router.route('/messages')
  .get(userRoute, messages.index)
  .post(userRoute, messages.create);

router.route('/messages/:id')
  .delete(userRoute, messages.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
