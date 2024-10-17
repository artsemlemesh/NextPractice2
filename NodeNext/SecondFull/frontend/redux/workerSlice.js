const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async () => {
    const res = await fetch('http://localhost:3001/workers', {
      headers: {
        'Content-Type': 'application/json', // to inform the server that im sending json data
      },
      credentials: 'include', //to include the cookies in the request
    });
    return res.json();
  }
);

export const addWorker = createAsyncThunk(
  'workers/addWorker',
  async (newWorker) => {
    const res = await fetch('http://localhost:3001/workers', {
      method: 'POST', //to indicate that im sending the data to the server
      headers: {
        'Content-Type': 'application/json', // to inform the server that im sending json data
      },
      body: JSON.stringify(newWorker), //the actual data im sending to the server, need to convert to json string, cause its the format expected by the server
      credentials: 'include', //to include the cookies in the request
    });
    return res.json();
  }
);

export const updateWorker = createAsyncThunk(
  'workers/updateWorker',
  async (updatedWorker) => {
    const res = await fetch(
      `http://localhost:3001/workers/${updatedWorker._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(updatedWorker),
        credentials: 'include',
      }
    );
    return res.json();
  }
);

export const deleteWorker = createAsyncThunk(
  'workers/deleteWorker',
  async (_id) => {
    const res = await fetch(`http://localhost:3001/workers/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', //probably not needed

      },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to delete worker');
    }
    return _id;
  }
);










const workersSlice = createSlice({
  name: 'workers',
  initialState: {
    workers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWorker.fulfilled, (state, action) => {
        state.workers.push(action.payload);
      })
      .addCase(updateWorker.fulfilled, (state, action) => {
        const index = state.workers.findIndex(
          (worker) => worker._id === action.payload._id
        );
        if (index !== -1) {
          state.workers[index] = action.payload;
        }
      })
      .addCase(deleteWorker.fulfilled, (state, action) => {
        state.workers = state.workers.filter(
          (worker) => worker._id !== action.payload // to remove the worker with the given id from the state after deleting it
        );
      });
  },
});

export default workersSlice.reducer;
