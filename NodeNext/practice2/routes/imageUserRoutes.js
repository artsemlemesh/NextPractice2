const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const imageUserController = require('../controllers/imageUserController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueName);
}
});



const upload = multer({ storage });

router.get('/users', imageUserController.getAllUsers);

router.post(
  '/upload',
  upload.single('profileImage'),
  imageUserController.uploadProfile
);

module.exports = router;
