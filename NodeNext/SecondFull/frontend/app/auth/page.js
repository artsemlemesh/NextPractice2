'use client';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import LogoutButton from '@/components/Logout';
import RegisterForm from '@/components/RegisterForm';

export default function Page() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log('USER',user)
  return (
    <>
      <Link href="/">go back</Link>
      <h1>register/login</h1>

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
            <p>Welcome, {user?.username}!</p>
            <LogoutButton />
            <br />
            <Link href="/">Main Page</Link>
          </>
        )}
      </div>
    </>
  );
}
