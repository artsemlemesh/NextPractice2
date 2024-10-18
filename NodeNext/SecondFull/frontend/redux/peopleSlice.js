const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');


export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  const res = await fetch('http://localhost:3001/people', {
    headers: {
      'Content-Type': 'application/json', // to inform the server that im sending json data
    },
    credentials: 'include',
  });
  const data = await res.json();
  return data;
});

export const addPerson = createAsyncThunk(
  'people/addPerson',
  async (newPerson, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/people/uploadPerson', {
        method: 'POST',
        body: newPerson, // FormData, not JSON
        credentials: 'include',
      });

      if (!res.ok) {
        // If the response is not ok, throw an error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add person');
      }

      const data = await res.json();
      return data; // Return the new person object
    } catch (error) {
      console.error('Error adding person:', error);
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const initialState = {
  people: [],
  status: 'idle',
  error: null,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPerson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people.push(action.payload.username); //add new user to the users array
      })
      .addCase(addPerson.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default peopleSlice.reducer;
