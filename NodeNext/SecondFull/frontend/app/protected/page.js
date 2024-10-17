'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedPage = () => {
  const router = useRouter();
  const isAuthenticated = // Logic to check if the user is authenticated (e.g., check cookie or state)

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the NotAuthorized page if not authenticated
      router.push('/not-authorized');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Protected Content</h1>
      {/* Your protected content goes here */}
    </div>
  );
};

export default ProtectedPage;