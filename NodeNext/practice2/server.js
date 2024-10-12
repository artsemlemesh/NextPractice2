require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const app = express();

// built-in middleware for json 
app.use(express.json());
//custom middleware logger
app.use(logger);


//routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/workers', workerRoutes);


//db connection
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})