// 'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from '../../redux/quotesSlice';

export default function AddQuoteForm() {
    const [character, setCharacter] = useState('');
    const [quote, setQuote] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addQuote({ character, quote }));
        setCharacter('');
        setQuote('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="Character"
            />
            <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Quote"
            />
            <button type="submit">Add Quote</button>
        </form>
    );
}