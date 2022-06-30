import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exercises/exerciseSlice";

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
  },
});
