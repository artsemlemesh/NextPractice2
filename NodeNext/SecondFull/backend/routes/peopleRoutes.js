const express = require('express');
const multer = require('multer');
const path = require('path');

const {
  getAllPeople,
  creataeNewPerson,
  uploadProfile
} = require('../controllers/peopleController');
const router = express.Router();

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
  
  

router.route('/')
    .get(getAllPeople)
    .post(creataeNewPerson);




router.post('/uploadPerson', upload.single('profileImage'), uploadProfile);


module.exports = router;