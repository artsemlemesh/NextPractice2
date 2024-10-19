'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to backend

export default function Home() {
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Clean up previous listeners
    socket.off('user-connected');
    socket.off('user-disconnected');
    socket.off('chat-message');
    // socket.off('username-taken'); // Add listener for username taken event

    // Listen for user connections
    socket.on('user-connected', (onlineUsers) => {
      console.log('Users connected:', onlineUsers); // Debugging log
      setUsers(onlineUsers);
    });

    // Listen for user disconnections
    socket.on('user-disconnected', (onlineUsers) => {
      console.log('Users after disconnect:', onlineUsers); // Debugging log
      setUsers(onlineUsers);
    });

    // Listen for incoming chat messages
    socket.on('chat-message', (data) => {
      console.log('New message received:', data); // Debugging log
      setMessages((prev) => [...prev, data]);
    });

    // Listen for username taken event
    // socket.on('username-taken', (username) => {
    //   alert(`Username "${username}" is already taken. Please choose another.`);
    // });

    return () => {
      // Clean up listeners
      socket.off('user-connected');
      socket.off('user-disconnected');
      socket.off('chat-message');
    //   socket.off('username-taken');
    };
  }, []);

  const connectUser = () => {
    console.log('USERNAME', username)
    if (username) {
      socket.emit('join', username);
      setIsConnected(true);
      setMessage('');
    }
  };

  const disconnectUser = () => {
    socket.disconnect();
    setIsConnected(false);
    setUsername('');
    setMessages([]);
    window.location.reload()
  };

  const sendMessage = () => {
    if (message) {
      socket.emit('chat-message', message);
      setMessage('');
    }
  };

  return (
    <div>
      {!isConnected ? (
        <div>
          <h2>Enter your name to join the chat</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={connectUser}>Connect</button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <h3>Messages</h3>
              <div>
                {messages.map((msg, idx) => (
                  <p key={idx}>
                    <strong>{msg.user}:</strong> {msg.message}
                  </p>
                ))}
              </div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>

            <div
              style={{
                width: '200px',
                borderLeft: '1px solid #ccc',
                paddingLeft: '10px',
              }}
            >
              <h3>Online Users</h3>
              <div>
                {users.map((user, idx) => (
                  <div
                    key={idx}
                    style={{ marginBottom: '10px', textAlign: 'center' }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#4caf50',
                        borderRadius: '50%',
                        display: 'inline-block',
                        color: 'white',
                        lineHeight: '40px',
                      }}
                    >
                      {user.charAt(0).toUpperCase()}
                    </div>
                    <p>{user}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={disconnectUser}>Disconnect</button>
        </div>
      )}
    </div>
  );
}