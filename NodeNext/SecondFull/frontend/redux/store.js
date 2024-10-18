import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workerSlice";
import authReducer from "./authSlice";
import peopleReducer from "./peopleSlice";

export const store = configureStore({
    reducer: {
        workers: workersReducer,
        auth: authReducer,
        people: peopleReducer
    },
});