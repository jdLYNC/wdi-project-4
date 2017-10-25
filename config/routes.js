const router = require('express').Router();
const jobs = require('../controllers/jobs');
const certifications = require('../controllers/certifications');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/jobs')
  .get(jobs.index)
  .post(jobs.create);

router.route('/jobs/:id')
  .get(jobs.show)
  .put(jobs.update)
  .delete(jobs.delete);

router.route('/certifications')
  .get(certifications.index);

router.route('/certifications/:id')
  .get(certifications.show);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
