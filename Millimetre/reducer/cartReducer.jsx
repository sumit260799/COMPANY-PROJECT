import React from "react";
import {
  SET_LOADING,
  SET_ERROR,
  ADD_TO_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_CART_ITEM,
  UPDATE_FILTER,
  UPDATE_SORT,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
  RESET_FILTER,
} from "../actions/actions";

const cartReducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      isError: true,
      isLoading: false,
    };
  }
  if (action.type === ADD_TO_PRODUCT) {
    const {
      _id,
      productName,
      productPrice,
      productDesc,
      productDiscount,
      productCategory,
      stock,
      companyName,
    } = action.payload;

    const tempItem = state.cart.find((item) => item.id === _id);
    if (tempItem) {
      return state;
    } else {
      const newItem = {
        id: _id,
        productName,
        productPrice,
        productDesc,
        productDiscount,
        productCategory,
        stock,
        companyName,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === FETCH_PRODUCTS) {
    return {
      ...state,
      cart: action.payload,
      sortCart: action.payload,
      isLoading: false,
    };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      (item) => item.productId !== action.payload
    );
    return { ...state, cart: tempCart };
  }
  if (action.type === UPDATE_FILTER) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === RESET_FILTER) {
    return {
      ...state,
      cart: state.sortCart,
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { sortCart } = state;
    const { text, productCategory, companyName } = state.filters;
    let tempProducts = [...sortCart];
    if (text) {
      tempProducts = tempProducts.filter((item) => {
        const lowerText = text.toLowerCase();
        return (
          item.productName.toLowerCase().includes(lowerText) ||
          item.productPrice.toString().includes(lowerText) || // Search by productPrice
          item.productDesc.toLowerCase().includes(lowerText) // Search by productDesc
        );
      });
    }
    if (productCategory !== "all categories") {
      tempProducts = tempProducts.filter(
        (item) => item.productCategory === productCategory
      );
    }
    if (companyName !== "all companies") {
      tempProducts = tempProducts.filter(
        (item) => item.companyName === companyName
      );
    }
    return {
      ...state,
      cart: tempProducts,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, sortCart } = state;

    let tempProducts = [];

    if (sort === "priceLowToHigh") {
      tempProducts = sortCart.sort((a, b) => a.productPrice - b.productPrice);
    }

    if (sort === "priceHighToLow") {
      tempProducts = sortCart.sort((a, b) => b.productPrice - a.productPrice);
    }
    if (sort === "name(a-z)") {
      tempProducts = sortCart.sort((a, b) => {
        return a.productName.localeCompare(b.productName);
      });
    }
    if (sort === "name(z-a)") {
      tempProducts = sortCart.sort((a, b) => {
        return b.productName.localeCompare(a.productName);
      });
    }
    return { ...state, cart: tempProducts };
  }

  return state;
};

export default cartReducer;
