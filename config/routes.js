const router = require('express').Router();
const jobs = require('../controllers/jobs');
const secureRoute = require('../lib/secureRoute');

router.route('/jobs')
  .get(jobs.index)
  .post(jobs.create);

router.route('/jobs/:id')
  .get(jobs.show)
  .put(jobs.update)
  .delete(jobs.delete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
