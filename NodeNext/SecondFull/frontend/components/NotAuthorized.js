import Link from 'next/link';

const NotAuthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Access Denied</h1>
      <p>You are not logged in. Please log in to access this page.</p>
      <Link href="/auth">Go to Login Page</Link>
    </div>
  );
};

export default NotAuthorized;