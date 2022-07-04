import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  numUsers: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const numberOfUsers = createAsyncThunk(
  "user/numUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.numberOfUsers();
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(numberOfUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(numberOfUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.numUsers = action.payload;
      })
      .addCase(numberOfUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
