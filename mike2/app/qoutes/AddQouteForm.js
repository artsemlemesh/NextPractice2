'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQoute } from '../store/store';

export default function AddQoutePage() {
  const dispatch = useDispatch();

  const [characterId, setCharacterId] = useState('');
  const [qoute, setQoute] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addQoute({ character_id: characterId, qoute: qoute }));
      setResponseMessage('Qoute created successfully');
      setCharacterId('');
      setQoute('');
    } catch (error) {
        setResponseMessage(`Error: ${error.message}`);
    }
  };
  return (
    <div>
      <h1>ADD QOUTE</h1>
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
    </div>
  );
}
