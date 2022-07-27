import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";

const initialState = {
  food: [],
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

export const editFood = createAsyncThunk(
  "food/editFood",
  async (foodData, thunkAPI) => {
    try {
      return await foodService.editFood(foodData);
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

export const removeFood = createAsyncThunk(
  "food/removeFood",
  async (id, thunkAPI) => {
    try {
      return await foodService.removeFood(id);
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
      })
      .addCase(editFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.food = state.food.map((foodItem) =>
          foodItem._id === action.payload.id ? action.payload.data : foodItem
        );
      })
      .addCase(editFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.food = state.food.filter(
          (foodItem) => foodItem._id !== action.payload
        );
      })
      .addCase(removeFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = foodSlice.actions;
export default foodSlice.reducer;
