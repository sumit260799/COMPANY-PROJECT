import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  shipping: JSON.parse(localStorage.getItem("shipping")) || {},
  isLoading: false,
  isError: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const ItemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (ItemIndex >= 0) {
        state.cart[ItemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.cart = [...state.cart, temp];
        // localStorage.setItem("cartData", JSON.stringify(state.cart));
      }
    },
    removeToCart: (state, action) => {
      console.log(action.payload);
      const newItem = state.cart.filter(
        (item) => item.productId !== action.payload
      );
      state.cart = newItem;
      // localStorage.setItem("cartData", JSON.stringify(newItem));
    },
    decToCart: (state, action) => {
      const decItem = state.cart.findIndex(
        (item) => item.productId === action.payload
      );

      if (state.cart[decItem].qnty >= 1) {
        state.cart[decItem].qnty -= 1;
      }
    },
    saveShippingAddress: (state, action) => {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
    },
    resetCart: (state) => {
      state.cart = [];
      // reset other cart-related state properties
    },
  },
});

export const {
  addToCart,
  removeToCart,
  decToCart,
  saveShippingAddress,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
