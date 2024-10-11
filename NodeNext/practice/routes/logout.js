const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutC');

router.get('/', logoutController.handleLogout);

module.exports = router;