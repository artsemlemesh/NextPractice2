require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const verifyToken = require('./middleware/cookieMiddleware');
const { checkRole } = require('./middleware/roleMiddleware');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/chat', (req, res) => {
  res.send('Chat route is active');
});

app.use('/', userRoutes);
app.use('/workers', verifyToken, checkRole('user'), workerRoutes);
app.use('/people', verifyToken, checkRole('user'), peopleRoutes);

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let users = []; // Array to track online users

io.on('connection', (socket) => {
  // console.log(`USER connected: ${socket.id}`);

  // Handle user joining
  socket.on('join', (username) => {
    if (username) {
      // Check if the username already exists
      const existingUser = users.find(user => user.name === username);
      if (existingUser) {
        console.log(`Username ${username} is already taken.`);
        // Optionally send a message back to the client
        socket.emit('username-taken', username);
        return;
      }

      users.push({ id: socket.id, name: username }); // Save user as an object
      console.log('Current users:', users.map(user => user.name));
      io.emit('user-connected', users.map(user => user.name)); // Send updated user list to all clients
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    const index = users.findIndex(user => user.id === socket.id);
    if (index !== -1) {
      const username = users[index].name;
      users.splice(index, 1); // Remove user by index
      console.log('User has been removed:', username);
      console.log('Users after deletion:', users.map(user => user.name));
      io.emit('user-disconnected', users.map(user => user.name)); // Send updated user list
    } else {
      console.log(`User with socket ID: ${socket.id} was not found in the user list.`);
    }
  });

  // Handle incoming chat messages
  socket.on('chat-message', (message) => {
    const username = users.find(user => user.id === socket.id)?.name; // Find the username
    if (username) {
      io.emit('chat-message', { user: username, message }); // Broadcast the message to all clients
    } else {
      console.log(`User with socket ID: ${socket.id} tried to send a message without a username`);
    }
  });
});

const PORT = process.env.PORT || 3001; // Default port if not set
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});