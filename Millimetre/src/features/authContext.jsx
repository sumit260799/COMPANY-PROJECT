import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getLoggedIn = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:4000/users/");
      setLoggedIn(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
