import { useEffect, useReducer, createContext, useContext } from "react";
import reducer from "../reducer/userReducer";
import {
  SET_LOADING,
  SET_TOKEN,
  HANDLE_LOGOUT,
  HANDLE_LOGIN,
  GET_USER_DATA,
  SET_PROFLE_DATA,
} from "../actions/actions";
import axios from "axios";
const url = import.meta.env.VITE_USER_API_URL;

const UserContext = createContext();

const initialState = {
  loading: false,
  userData: [], // Change [] to {}
  profileData: [],
  tokenId: localStorage.getItem("tokenId") || null,
  loginUser: JSON.parse(localStorage.getItem("userlogin")) || null, // Use null as the initial value
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTokenId = (id) => {
    dispatch({ type: SET_TOKEN, payload: id });
  };

  const fetchUserData = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${url}design/${state.tokenId}`);
      dispatch({ type: GET_USER_DATA, payload: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
      // You can handle the error and show a message to the user here
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [state.tokenId]);
  const handleLogout = () => {
    dispatch({ type: HANDLE_LOGOUT });
    localStorage.clear();
  };

  const userLogin = (value) => {
    dispatch({ type: HANDLE_LOGIN, payload: value });
  };

  const setProfileData = (value) => {
    dispatch({ type: SET_PROFLE_DATA, payload: value });
  };
  useEffect(() => {
    localStorage.setItem("userlogin", JSON.stringify(state.loginUser));
  }, [state.loginUser]);
  useEffect(() => {
    localStorage.setItem("tokenId", state.tokenId);
  }, [state.tokenId]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        setTokenId,
        fetchUserData,
        handleLogout,
        userLogin,
        setProfileData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
