const express = require('express');
const {getAllWrokers, createNewWroker, updateWorker, deleteWorker, getWorker} = require('../controllers/workerController');
const router = express.Router();

router.route('/')
    .get(getAllWrokers)
    .post(createNewWroker)
    .put(updateWorker)
    .delete(deleteWorker);

router.route('/:id')
    .get(getWorker);


module.exports = router;