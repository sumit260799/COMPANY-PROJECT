import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user"); // Retrieve user data from localStorage

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null, // Parse the stored user data if it exists
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    userLogout(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", state.user);
    },
  },
});

export const { setUserData, userLogout } = userSlice.actions;
export default userSlice.reducer;
