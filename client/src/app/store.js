import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exercises/exerciseSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import planDraftReducer from "../features/planDrafts/planDraftSlice";
import planReducer from "../features/plans/planSlice";
import foodReducer from "../features/food/foodSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    food: foodReducer,
    users: userReducer,
    planDrafts: planDraftReducer,
    plans: planReducer,
  },
});
