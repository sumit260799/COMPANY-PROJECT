import axios from "axios";
import { useFormik } from "formik";
// import { signInSchema } from "../utils/ValidationSchema";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../mnf_context/userContext";
import { useCartContext } from "../../mnf_context/cartContext";
import { useEffect, useState } from "react";
const signUrl = import.meta.env.VITE_USER_SIGNIN_URL;
const url = import.meta.env.VITE_USER_API_URL;

const initialValues = {
  email: "",
  password: "",
};
export default function SignIn() {
  const { userLogin, setTokenId, fetchUserData } = useUserContext();
  const { fetchData, cart, fetchProducts } = useCartContext();

  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched, // Add the touched object here
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: signInSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${signUrl}`, values);
        const token = response.data.token;
        const commonId = response.data.commonId;
        localStorage.setItem("token", token);

        if (response.data.role === "brandUser") {
          userLogin("brandUser");
          localStorage.setItem("brandId", commonId);
          navigate("/");
        } else if (response.data.role === "infUser") {
          userLogin("infUser");
          setTokenId(commonId);
          fetchProducts();
          fetchUserData();
          navigate("/");
        } else if (response.data.role === "adminUser") {
          userLogin("adminUser");
          navigate("/adminpannel");
        }

        action.resetForm();
      } catch (error) {
        toast.error(error.response.data, { duration: 1000 });
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center  ">
      <div className="border border-gray-400  md:rounded-xl px-10 py-12 mt-2 w-[100%] md:max-w-md">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Millimetre
        </h1>
        <p className="text-lg text-center text-gray-600 mb-1 ">Sign in</p>
        <div className="border-b-2 border-gray-300 mb-6"></div>
        <form className="mt-4 flex flex-col gap-y-4 " onSubmit={handleSubmit}>
          <input
            className="w-full outline-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-3  focus:ring-1 focus:ring-gray-500"
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder="Email Address"
            autoComplete="email"
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            required
          />
          {touched.email && errors.email && (
            <p className="yupError">{errors.email}</p>
          )}
          <input
            className="w-full bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-gray-500"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          {touched.password && errors.password && (
            <p className="yupError">{errors.password}</p>
          )}
          <button
            type="submit"
            className="w-full mt-5  border border-gray-500 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
          >
            Sign In
          </button>
          <div className="flex justify-center text-sm mt-4">
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
