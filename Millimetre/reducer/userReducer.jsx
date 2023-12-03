import React from "react";
import {
  SET_LOADING,
  SET_TOKEN,
  HANDLE_LOGOUT,
  HANDLE_LOGIN,
  GET_USER_DATA,
  UPDATED_DATA,
  SET_PROFLE_DATA,
} from "../actions/actions";
const userReducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      tokenId: action.payload,
    };
  }
  if (action.type === HANDLE_LOGOUT) {
    return {
      ...state,
      loginUser: false,
    };
  }
  if (action.type === HANDLE_LOGIN) {
    return {
      ...state,
      loginUser: action.payload,
    };
  }
  if (action.type === GET_USER_DATA) {
    return {
      ...state,
      userData: action.payload,
      loading: false,
    };
  }

  if (action.type === SET_PROFLE_DATA) {
    return {
      ...state,
      profileData: action.payload,
    };
  }
};

export default userReducer;
