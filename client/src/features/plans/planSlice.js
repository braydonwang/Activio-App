import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planService from "./planService";

const initialState = {
  plans: [],
  numPlans: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const numberOfPlans = createAsyncThunk(
  "plan/numPlans",
  async (_, thunkAPI) => {
    try {
      return await planService.numberOfPlans();
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

export const getPlans = createAsyncThunk(
  "plan/getPlans",
  async (search, thunkAPI) => {
    try {
      return await planService.getPlans(search);
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

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(numberOfPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(numberOfPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.numPlans = action.payload;
      })
      .addCase(numberOfPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plans = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = planSlice.actions;
export default planSlice.reducer;
