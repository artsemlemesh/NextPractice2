'use client'; // This component will handle CSR

import { useState } from 'react';

export default function AddCarsFilter({ initialCars }) {
  const [filter, setFilter] = useState('');
  const [cars, setCars] = useState(initialCars); // Hydrated from SSR

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by make"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredCars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} {car.year}
          </li>
        ))}
      </ul>
    </div>
  );
}