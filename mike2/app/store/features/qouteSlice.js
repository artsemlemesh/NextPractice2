import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  qoutes: [],
  status: 'idle',
  error: null,
};

export const fetchQoutes = createAsyncThunk('qoutes/fetchQoutes', async () => {
  const response = await fetch('http://localhost:3000/api/qoutes');
  const data = await response.json();
  return data;
});

export const addQoute = createAsyncThunk('qoutes/addQoute', async (qoute) => {
  const response = await fetch('http://localhost:3000/api/qoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qoute),
  });
  const data = await response.json();
  return data;
});

export const qouteSlice = createSlice({
  name: 'qoute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQoutes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.qoutes = action.payload;
      })
      .addCase(fetchQoutes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addQoute.fulfilled, (state, action) => {
        state.status = 'success';
        state.qoutes.push(action.payload);
      })
      .addCase(addQoute.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addQoute.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export default qouteSlice.reducer;
