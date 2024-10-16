import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from './quotesSlice';
import workersReducer from './workerSlice';
import imageUserReducer from './imageUserSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        quotes: quotesReducer,
        workers: workersReducer,
        imageUser: imageUserReducer,
        auth: authReducer,
    },
});