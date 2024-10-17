require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const verifyToken = require('./middleware/cookieMiddleware');

// built-in middleware for json
app.use(express.json());

//cors is for the frontend to be able to access the backend

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, //optional, if im using cookies/auth tokens
  })
);

//middleware for cookies
app.use(cookieParser());

//to serve static files//allows users to access the images in the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use('/', userRoutes);
app.use('/workers', verifyToken, workerRoutes); //can apply verifyToken middleware here
//temporary removed verifyToken middleware from workers
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
