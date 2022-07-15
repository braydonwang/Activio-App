import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planService from "./planService";

const initialState = {
  plans: [],
  plan: null,
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

export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (planData, thunkAPI) => {
    try {
      return await planService.createPlan(planData);
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

export const getPlan = createAsyncThunk(
  "plan/getPlan",
  async (id, thunkAPI) => {
    try {
      return await planService.getPlan(id);
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

export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async (planData, thunkAPI) => {
    try {
      return await planService.updatePlan(planData);
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

export const updateLikes = createAsyncThunk(
  "plan/updateLikes",
  async (planData, thunkAPI) => {
    try {
      return await planService.updateLikes(planData);
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
      .addCase(createPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plan = action.payload;
      })
      .addCase(createPlan.rejected, (state, action) => {
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
      })
      .addCase(getPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plan = action.payload;
      })
      .addCase(getPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePlan.pending, (state) => {})
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plan = action.payload;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLikes.pending, (state) => {})
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plan = action.payload;
      })
      .addCase(updateLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = planSlice.actions;
export default planSlice.reducer;
