'use client';
import { addCar } from '@/store/features/carSlice/carSlice'; // Update the import path
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddCarPage() {
  const dispatch = useDispatch();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const resultAction = dispatch(
        addCar({
          make,
          model,
          year: Number(year),
          color,
          price: Number(price),
        })
      );
      console.log('Result Action:', resultAction);
    //   if (addCar.fulfilled.match(resultAction)) {
        setResponseMessage('Car added successfully!');
        setMake('');
        setModel('');
        setYear('');
        setColor('');
        setPrice('');
    //   } else {
    //     console.error('Error creating car', resultAction.payload);
    //   }
    } catch (error) {
      console.error('Error creating car', error);
    }
  };

  return (
    <>
      <h1>Add Car</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="make">Make</label>
          <input
            type="text"
            id="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Car button</button>
      </form>
    </>
  );
}
