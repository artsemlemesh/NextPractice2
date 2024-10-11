const express = require('express');
const router = express.Router();
const authController = require('../controllers/authC');

router.post('/', authController.handleLogin);

module.exports = router;