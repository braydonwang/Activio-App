import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exercises/exerciseSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
  },
});
