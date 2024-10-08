import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




const initialState = {
  cars: [],
  status: 'idle',
  error: null,
};


export const fetchCars = createAsyncThunk(
    'cars/fetchCars',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('/api/cars');
            const data = await response.json();
            return data; // this will be the payload in 'fulfilled'
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addCar = createAsyncThunk(
    'cars/addCar',
    async (newCar, thunkAPI) => {
        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCar),
            });
            const data = await response.json();
            return data; // this will be the payload in 'fulfilled'
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {}, //for sync actions
    extraReducers: (builder) => {
        //for async  actions
        builder
            .addCase(fetchCars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCar.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cars.push(action.payload);
            })
            .addCase(addCar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default carSlice.reducer;