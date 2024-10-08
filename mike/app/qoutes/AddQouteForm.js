'use client';

import { addQoute } from '@/store/features/qouteSlice/qouteSlice'; // Update the import path
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddQuotePage() {
  const dispatch = useDispatch();

  const [characterId, setCharacterId] = useState('');
  const [qoute, setQoute] = useState('');
  const [responseMessage, setResponseMessage] = useState('');



  const handleSubmit =  (e) => {
    e.preventDefault();
    try {
      // Dispatching the Redux action to add a quote
      const resultAction =  dispatch(
        addQoute({
          character_id: Number(characterId),
          qoute: qoute,
        })
      );

      if (addQoute.fulfilled.match(resultAction)) {
        setResponseMessage('Quote added successfully!');
        setCharacterId('');
        setQoute('');
      } else {
        setResponseMessage(`Error: ${resultAction.payload}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Add qoute</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="characterId">Character ID</label>
          <input
            type="text"
            id="characterId"
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="qoute">Qoute</label>
          <textarea
            id="qoute"
            value={qoute}
            onChange={(e) => setQoute(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add qoute</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </>
  );
}
