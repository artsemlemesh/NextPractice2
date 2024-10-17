import { registerUser } from '@/redux/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser({ name, email, password }));
      // Redirect to login page or show success message

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label> {/* Email input field */}
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
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>Error during registration!</p>}

    </form>
  );
}
