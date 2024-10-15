'use client'

// components/UserList.js
import { fetchUsers } from '@/redux/imageUserSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.imageUser.users)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>User List</h1>
      {console.log('users:', users)}
      {users.length === 0 && <p>No users found</p>}
      {users.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {user.profileImage && (
            <img src={`http://localhost:3001${user.profileImage}`} alt="User Profile" width="150" />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;