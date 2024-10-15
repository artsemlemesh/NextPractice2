const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     bucketName: 'uploads',
//   });
//   console.log('GridFS initialized');
// });

// const storage = new GridFsStorage({
//   url: process.env.DATABASE_URL,
//   file: (req, file) => {
//     return {
//       bucketName: 'uploads',
//       filename: `file-${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//   const newImage = new Image({
//     filename: req.file.filename,
//     fileId: req.file.id,
//   })
// });

// newImage.save()
//   .then(() => res.send('Image uploaded successfully'))
//   .catch((err) => res.status(500).send('Error uploading image', err));

module.exports = connectDB;
