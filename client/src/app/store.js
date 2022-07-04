import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exercises/exerciseSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import planReducer from "../features/plans/planSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    users: userReducer,
    plans: planReducer,
  },
});
