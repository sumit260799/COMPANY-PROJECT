// authenticationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      console.log("🚀 -------------------------------------------🚀");
      console.log("🚀  file: authSlice.jsx:12  payload", action.payload);
      console.log("🚀 -------------------------------------------🚀");
    },
  },
});

export const { setAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;
