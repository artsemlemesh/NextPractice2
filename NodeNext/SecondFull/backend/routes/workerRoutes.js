const express = require('express');
const {
  getAllWorkers,
  createNewWorker,
  updateWorker,
  deleteWorker,
  getWorker,
} = require('../controllers/workerController');
const router = express.Router();

router.route('/')
  .get(getAllWorkers)
  .post(createNewWorker)


router.route('/:id')
  .get(getWorker)
  .put(updateWorker)
  .delete(deleteWorker);


module.exports = router;