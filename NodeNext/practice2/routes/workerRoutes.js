const express = require('express');
const {getAllWorkers,
    createNewWorker,
    updateWorker,
    deleteWorker,
    getWorker,} = require('../controllers/workerController');
const router = express.Router();

router.route('/')
    .get(getAllWorkers)
    .post(createNewWorker)
    // .put(updateWorker)
    // .delete(deleteWorker);

router.route('/:id')
    .get(getWorker)
    .delete(deleteWorker)
    .put(updateWorker)




module.exports = router;