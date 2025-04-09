import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch reports
export const fetchReport = createAsyncThunk(
  "report/fetchReport",
  async (type, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/reports/${type}`);
      if (!response.ok) throw new Error("Report not found");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReport: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReport } = reportSlice.actions;
export default reportSlice.reducer;
