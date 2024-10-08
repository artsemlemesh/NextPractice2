import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  qoutes: [],
  status: 'idle',
  error: null,
};

export const fetchQoutes = createAsyncThunk(
  'qoutes/fetchQoutes',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/qoutes');
      const data = await response.json();
      return data; //this will be the payload in 'fulfilled'
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addQoute = createAsyncThunk(
  'qoutes/addQoute',
  async (newQoute, thunkAPI) => {
    try {
      const response = await fetch('/api/qoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQoute),
      });
      const data = await response.json();
      return data; // this will be the payload in 'fulfilled'
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const qouteSlice = createSlice({
  name: 'qoutes',
  initialState,
  reducers: {}, //for sync actions
  extraReducers: (builder) => {
    //for async  actions
    builder
      .addCase(fetchQoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQoutes.fulfilled, (state, action) => {
        state.status = 'success';
        state.qoutes = action.payload;
      })
      .addCase(fetchQoutes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addQoute.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addQoute.fulfilled, (state, action) => {
        state.status = 'success';
        state.qoutes.push(action.payload); //adds new qoute to the array
      })
      .addCase(addQoute.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default qouteSlice.reducer;
