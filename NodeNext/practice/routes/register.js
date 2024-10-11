const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerC');

router.post('/', registerController.handleNewUser);

module.exports = router;