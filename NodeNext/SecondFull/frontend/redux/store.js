import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workerSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        workers: workersReducer,
        auth: authReducer,
    },
});