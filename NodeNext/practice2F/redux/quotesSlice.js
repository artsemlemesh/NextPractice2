import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions for fetching and adding quotes
export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
    const res = await fetch('http://localhost:3000/api/quotes');
    return res.json();
});

export const addQuote = createAsyncThunk('quotes/addQuote', async (newQuote) => {
    const res = await fetch('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuote),
    });
    return res.json();
});

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        items: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(addQuote.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default quotesSlice.reducer;