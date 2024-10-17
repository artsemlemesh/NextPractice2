'use client';
import { loginUser } from '@/redux/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error} = useSelector((state) => state.auth);
  console.log('ERROR', error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    // Redirect to login page or show success message
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>Wrong credentials!</p>}
    </form>
  );
}
