'use client';

import { addPerson } from '@/redux/peopleSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddUserForm() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  // const {error, success} = useSelector((state) => state.workers)

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('profileImage', profileImage);

    dispatch(addPerson(formData));
    setUsername('');
    setProfileImage(null);
  };

  

  return (
    <>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Add PERSON</button>
      </form>
    </>
  );
}
