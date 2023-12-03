import React, { useState } from "react";
import { Link } from "react-router-dom";
import StoreFrontNav from "./StoreFrontNav";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setAuthenticated } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const url = import.meta.env.VITE_USERS_URL;
import { setUserData } from "../features/userSlice";
const StoreFrontSignIn = () => {
  const commonId = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${url}`, {
        withCredentials: true,
      }); // Replace with your actual API endpoint
      console.log(
        "🚀 -------------------------------------------------------------------------🚀"
      );
      console.log(
        "🚀  file: StorefrontSignin.jsx:22  checkAuthentication  response",
        response.data.isAuthenticated
      );
      console.log(
        "🚀 -------------------------------------------------------------------------🚀"
      );

      if (response.data.isAuthenticated) {
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated(false);
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await axios.post(`${url}login`, formData, {
        withCredentials: true,
      });
      dispatch(setUserData(response.data));
      checkAuthentication();
      navigate(`/${commonId && commonId.commonId}/categories`);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, { duration: 2000 });
    }
  };

  return (
    <>
      <StoreFrontNav />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "50px",
            },
          }}
        />
        <div className="sm:bg-white mt-12 p-8 sm:rounded sm:shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md outline-none focus:border-2 focus:border-gray-400 "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md outline-none focus:border-2 focus:border-gray-400  "
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 text-white rounded-md outline-none"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-gray-600">
          new account?{" "}
          <Link
            to={`/${commonId && commonId.commonId}/signup`}
            className="text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default StoreFrontSignIn;
