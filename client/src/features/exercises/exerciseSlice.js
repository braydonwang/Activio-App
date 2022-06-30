import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
  currentPage: 1,
  numberOfPages: 1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: false,
};

export const getExercises = createAsyncThunk(
  "exercises/getExercises",
  async (page, thunkAPI) => {
    try {
      return await exerciseService.getExercises(page);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = exerciseSlice.actions;
export default exerciseSlice.reducer;
