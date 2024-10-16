require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const imageUserRoutes = require('./routes/imageUserRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/cookieMiddleware');
const app = express();

// built-in middleware for json 
app.use(express.json());

// cors for frontend to access backend
app.use(cors({origin: 'http://localhost:3000',
     credentials: true //optionalL: if im using cookies/auth tokens
    }));
//custom middleware logger
app.use(logger);
app.use(cookieParser());//add for cookies

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', imageUserRoutes)

//routes
app.use('/auth', authRoutes);
// app.use('/api', userRoutes);
app.use('/workers', verifyToken, workerRoutes);


//db connection
connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})