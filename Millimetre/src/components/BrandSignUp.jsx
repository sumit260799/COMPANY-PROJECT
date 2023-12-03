import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrandSignUpSchema } from "../utils/ValidationSchema";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
const url = import.meta.env.VITE_BRAND_API_URL;

// import { BrandSignUpSchema } from "../utils/ValidationSchema";
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function BrandSignUp() {
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
    validationSchema: BrandSignUpSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${url}register`, values);
        const token = response.data?.token;
        const commonId = response.data?.commonId;
        localStorage.setItem("token", token);
        localStorage.setItem("brandId", commonId);
        action.resetForm();
        navigate("/brand-create");
      } catch (error) {
        toast.error(error?.response?.data, { duration: 2000 });
      }
    },
  });

  return (
    <section className=" mx-auto md:fixed top-2 right-0 bottom-0 left-0 overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "50px",
          },
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div
          className="hidden  md:flex bg-cover bg-center h-screen"
          style={{
            backgroundImage:
              "url(https://s3.ap-south-1.amazonaws.com/thinktank.official/beautiful-smiling-young-blonde-woman-pointing-sunglasses-holding-shopping-bags-credit-card-pink-wall.jpg)",
          }}
        ></div>
        <div className="flex items-center justify-center p-2 ">
          <div className="  w-[95%] md:w-[80%] mx-auto">
            <h1 className=" text-2xl md:text-3xl  font-bold text-center mb-4">
              Connect Your Brand and Start Selling
            </h1>
            <p className="text-sm md:text-lg text-center mb-8">
              Interested in connecting to Millimetre? Create an account to learn
              more!
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-full border rounded border-gray-300 outline-none"
                  required
                />
                {touched.email && errors.email && (
                  <p className="yupError mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-full border rounded border-gray-300 outline-none"
                  autoComplete="current-password"
                  required
                />
                {touched.password && errors.password && (
                  <p className="yupError mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-full border rounded border-gray-300 outline-none"
                  autoComplete="current-password"
                  required
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="yupError mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded hover:bg-gray-900"
              >
                Continue
              </button>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
