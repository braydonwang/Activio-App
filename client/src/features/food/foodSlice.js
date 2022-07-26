import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";

const initialState = {
  food: [],
  foodItem: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: false,
};

export const getFood = createAsyncThunk(
  "food/getFood",
  async (username, thunkAPI) => {
    try {
      return await foodService.getFood(username);
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

export const addFood = createAsyncThunk(
  "food/addFood",
  async (foodData, thunkAPI) => {
    try {
      return await foodService.addFood(foodData);
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

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.food = action.payload;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.food = [...state.food, action.payload];
      })
      .addCase(addFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = foodSlice.actions;
export default foodSlice.reducer;
