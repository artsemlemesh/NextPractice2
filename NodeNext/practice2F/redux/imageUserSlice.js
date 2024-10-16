const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchUsers = createAsyncThunk('imageUser/fetchUsers', async () => {
  const res = await fetch('http://localhost:3001/api/users',{
    headers: {
      'Content-Type': 'application/json', // to inform the server that im sending json data
    },
    credentials: 'include'
  }
    

  );
  return res.json();
});

export const addUser = createAsyncThunk(
  'imageUser/addUser',
  async (newUser) => {
    const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: newUser, //formData, not JSON, also no need headers, because its form,its being set automatically
      credentials: 'include'

    });
    const data = await res.json()
    console.log('ADD USER RESPONSE', data)
    return data
  }
);

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

const imageUserSlice = createSlice({
  name: 'imageUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload.user); //add new user to the users array
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default imageUserSlice.reducer;
