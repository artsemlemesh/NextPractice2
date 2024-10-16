// src/context/AuthProvider.js
import useAuth from '@/hooks/useAuth';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth(); // This uses your custom useAuth hook

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};