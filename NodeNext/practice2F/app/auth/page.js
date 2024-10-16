'use client';

import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import LogoutButton from './Logout';
import RegisterForm from './RegisterForm';
import Link from 'next/link';

export default function Page() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <h1>Register</h1>
          <RegisterForm />
          <h1>Login</h1>
          <LoginForm />
        </>
      ) : (
        <>
          <p>Welcome, {user?.name}!</p>
          <LogoutButton /><br/>
          <Link href='/'>Main Page</Link>
        </>
      )}
    </div>
  );
}