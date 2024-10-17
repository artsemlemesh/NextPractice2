import { logoutUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = '/auth';
  };

  return <button onClick={handleLogout}>Logout</button>;
}