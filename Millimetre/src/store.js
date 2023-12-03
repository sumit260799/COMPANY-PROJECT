import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import dataReducer from "./features/dataSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
const store = configureStore({
  reducer: {
    profile: profileReducer,
    data: dataReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
