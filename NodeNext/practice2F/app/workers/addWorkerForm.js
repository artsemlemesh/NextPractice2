import { addWorker } from "@/redux/workerSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";



export default function AddWorkerForm() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [age, setAge] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addWorker({ name, position, salary: Number(salary), age: Number(age) }));
        setName('');
        setPosition('');
        setSalary('');
        setAge('');

    }


return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
        />
        <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
        />
        <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
        />
        <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        />
        <button type="submit">Add Worker</button>
    </form>
);


}