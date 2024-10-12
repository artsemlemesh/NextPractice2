const express = require('express');
const { verifyJWT, checkRole } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');
const router = express.Router();


router.get('/', getAllUsers);

module.exports = router;