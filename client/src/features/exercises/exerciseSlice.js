import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
  exercise: null,
  similarBodyPart: [],
  similarEquipment: [],
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

export const getExercise = createAsyncThunk(
  "exercises/getExercise",
  async (id, thunkAPI) => {
    try {
      return await exerciseService.getExercise(id);
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

export const getExercisesBySearch = createAsyncThunk(
  "exercises/getExercisesBySearch",
  async (searchData, thunkAPI) => {
    try {
      return await exerciseService.getExercisesBySearch(searchData);
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
        state.exercises = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercise = action.payload.data;
        state.similarBodyPart = action.payload.bodyPart;
        state.similarEquipment = action.payload.equipment;
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercisesBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercisesBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getExercisesBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = exerciseSlice.actions;
export default exerciseSlice.reducer;
