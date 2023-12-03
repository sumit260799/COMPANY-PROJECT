import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const userUrl = import.meta.env.VITE_USER_API_URL;
const initialState = {
  userData: null, // Initialize userData to null
  // Define other initial state properties here
  loading: false,
  error: null,
  commonId: JSON.parse(sessionStorage.getItem("token")) || null,
};

// Create an async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async (secondPart, { rejectWithValue }) => {
    try {
      // Make an API call using secondPart
      const response = await fetch(`${userUrl}design/${secondPart}`);
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {
    setCommonId(state, action) {
      state.commonId = action.payload;
      sessionStorage.setItem("token", JSON.stringify(action.payload));
    },
  },
});

export const { setUserData, setCommonId } = profileSlice.actions;
export default profileSlice.reducer;
