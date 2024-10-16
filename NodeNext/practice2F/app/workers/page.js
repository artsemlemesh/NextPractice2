'use client'

import { deleteWorker, fetchWorkers } from "@/redux/workerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddWorkerForm from "./addWorkerForm";



export default function WorkersPage() {

    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers.workers)
  console.log('workers', workers)
    useEffect(() => {
        dispatch(fetchWorkers())
    }, [dispatch])

    const handleDelete = (_id) => {
        console.log('delete worker', _id)
        dispatch(deleteWorker(_id))
    }

    return (
    <div>
      <h1>Workers</h1>
      <AddWorkerForm />
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.name} - {worker.position}
            <button onClick={() => handleDelete(worker._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}