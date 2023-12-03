import React, { useEffect, createContext, useContext, useReducer } from "react";
import axios from "axios";
import {
  SET_LOADING,
  GET_PRODUCTS,
  SET_ERROR,
  UPDATE_SORT,
  UPDATE_FILTER,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
} from "../actions/actions";
const url = import.meta.env.VITE_BRAND_API_URL;

import reducer from "../reducer/productsReducer";
const ProductsContext = createContext();
//...........

const initialState = {
  isLoading: false,
  isError: false,
  allProducts: [],
  mainProducts: [],
  sort: "default",
  filters: {
    text: "",
    productCategory: "all categories",
    companyName: "all companies",
  },
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };
  const fetchData = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${url}brandproducts`);
      dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.sort, state.filters]);

  return (
    <ProductsContext.Provider value={{ ...state, updateSort, updateFilter }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
