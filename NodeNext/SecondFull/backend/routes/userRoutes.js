const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


router.get('/users', userController.getAllUsers);
router.post('/upload', upload.single('profileImage'), userController.uploadProfile);


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;