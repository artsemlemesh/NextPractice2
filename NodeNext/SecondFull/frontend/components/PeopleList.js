'use client';

import { fetchPeople } from '@/redux/peopleSlice';
// components/UserList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const PeopleList = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const status = useSelector((state) => state.people.status); // Access loading status

  useEffect(() => {
    if( status === 'idle') {
        dispatch(fetchPeople());

    }
  }, [dispatch, status]);

  console.log('PEOPEL:', people);
  console.log('STATUS:', status);
  //   if (loading) return <p>Loading users...</p>;
  //   if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>People List</h1>

      {people.length > 0 ? ( people.map((person, index) => (
        <div key={index}>
          <h2>{person.username}</h2>
          {person.profileImage && (
            <img
              src={`http://localhost:3001${person.profileImage}`}
              alt="User Profile"
              width="150"
            />
          )}
        </div>
      )) ): (<p>No people available or access denied</p>)}
    </div>
  );
};

export default PeopleList;
