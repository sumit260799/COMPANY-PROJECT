import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import {
  SET_BRAND_ID,
  BRAND_PRODUCTS,
  DELETE_PRODUCT,
} from "../actions/actions";
import reducer from "../reducer/brandInfoReducer";
import axios from "axios";
const Url = import.meta.env.VITE_BRAND_API_URL;
const BrandInfoContext = createContext();

const initialState = {
  brandId: "",
  products: [],
};

export const BrandInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTokenId = async () => {
    try {
      const getToken = localStorage.getItem("brandId");

      if (getToken) {
        dispatch({ type: SET_BRAND_ID, payload: getToken });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTokenId();
  }, []);

  const fetchProducts = async (id) => {
    try {
      const response = await axios.get(`${Url}brandproducts/${id}`);
      dispatch({ type: BRAND_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${Url}brandproducts/${id}`);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrandInfoContext.Provider
      value={{ ...state, deleteProduct, fetchProducts, setTokenId }}
    >
      {children}
    </BrandInfoContext.Provider>
  );
};

export const useBrandInfoContext = () => {
  return useContext(BrandInfoContext);
};
