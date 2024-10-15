'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from '../../redux/quotesSlice';
import AddQuoteForm from './addQuoteForm';

export default function QuotesPage() {
    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes.items);

    useEffect(() => {
        dispatch(fetchQuotes());
    }, [dispatch]);

    return (
        <div>
            <h1>Quotes</h1>
            <AddQuoteForm />
            <ul>
                {quotes.map((quote) => (
                    <li key={quote._id}>{quote.character}: {quote.quote}</li>
                ))}
            </ul>
        </div>
    );
}