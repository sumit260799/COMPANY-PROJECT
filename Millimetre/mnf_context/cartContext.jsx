import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import reducer from "../reducer/cartReducer";
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
const url = import.meta.env.VITE_USER_API_URL;

import { useUserContext } from "./userContext";

const initialState = {
  isLoading: false,
  isError: false,
  cart: [],
  sortCart: [],
  sort: "default",
  filters: {
    text: "",
    productCategory: "all categories",
    companyName: "all companies",
  },
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { tokenId } = useUserContext();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [toggle, setToggle] = useState(false);
  const fetchProducts = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${url}products/${tokenId}`);
      dispatch({ type: FETCH_PRODUCTS, payload: response.data });
      setToggle(!toggle);
    } catch (error) {
      dispatch({ type: SET_ERROR });
    }
  };

  const addToProduct = async (values) => {
    try {
      const response = await axios.post(`${url}products`, values);
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (value) => {
    try {
      const response = await axios.delete(`${url}products/${value}`);
      dispatch({ type: REMOVE_CART_ITEM, payload: value });
    } catch (error) {
      console.error(error);
    }
  };
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  const updateFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };

  const resetFilter = () => {
    dispatch({ type: RESET_FILTER });
  };
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.sort, state.filters]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToProduct,
        handleDeleteProduct,
        fetchProducts,
        updateFilter,
        updateSort,
        resetFilter,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
