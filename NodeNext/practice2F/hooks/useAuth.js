import { checkAuth } from '@/redux/authSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {
    const dispatch = useDispatch();
    
    const { user, isAuthenticated, token, error } = useSelector((state) => state.auth);
    console.log('THREE', user, isAuthenticated, token);

    // Check if the user is authenticated on initial mount
    useEffect(() => {
      if (!isAuthenticated && !user && !token) {
        // dispatch(checkAuth()); // Dispatch checkAuth on first load
        }
    }, [isAuthenticated, dispatch, user, token]);

    

    return { user, isAuthenticated, token, error };
};

export default useAuth;