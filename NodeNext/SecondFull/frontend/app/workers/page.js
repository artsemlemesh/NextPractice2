'use client';

import AddWorkerForm from '@/components/AddWorkerForm';
import { deleteWorker, fetchWorkers } from '@/redux/workerSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorkersPage() {
  const dispatch = useDispatch();

  const workers = useSelector((state) => state.workers.workers || []);





  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteWorker(_id));
  };

  return (
    <div>
        <Link href='/'>Go Back</Link>
      <h1>Workers</h1>
      <AddWorkerForm/>
      <ul>
      {workers.length > 0 ? (
          workers.map((worker) => (
            <li key={worker._id}>
              {worker.name} - {worker.position}
              <button onClick={() => handleDelete(worker._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No workers available or access denied.</li> // Show a message if no workers
        )}
      </ul>
    </div>
  );
}
