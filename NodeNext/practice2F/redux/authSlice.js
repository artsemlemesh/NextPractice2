import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'imageUser/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        // If server returns an error, reject the promise with the error message
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const loginUser = createAsyncThunk(
  'imageUser/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }

      const data = await res.json();
      console.log('LOGIN RESPONSE', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const logoutUser = createAsyncThunk('imageUser/logoutUser', async () => {
  const res = await fetch('http://localhost:3001/api/logout', {
    method: 'POST',
    credentials: 'include', // include the cookie in the request
  });
  const data = await res.json();
  return data;
});




export const checkAuth = createAsyncThunk('imageUser/checkAuth', async () => {
  const res = await fetch('http://localhost:3001/api/check-auth', {
    method: 'GET',
    credentials: 'include', // include the cookie in the request
  });
  if (res.ok) {
    const data = await res.json();
  return data; //returns user and token
  } else {
    throw new Error('Failed to check authentication');
  }
  
});

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
