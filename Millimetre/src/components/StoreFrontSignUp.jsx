import React, { useState } from "react";
import { Link } from "react-router-dom";
import StoreFrontNav from "./StoreFrontNav";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import uploadIcon from "./../assets/upload-icon.png";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../features/userSlice";
const url = import.meta.env.VITE_USERS_URL;

const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const StoreFrontSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { commonId } = useSelector((state) => state.profile);

  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    profilePicture: "",
    password: "",
    confirmPassword: "",
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${baseUrl}api/upload/signature`, {
        folder,
      });
      return res.data;
      console.log("st", res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const uploadFile = async (type, timestamp, signature) => {
    const folder = "userProfile";
    const data = new FormData();
    data.append("file", imageURL);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", API_KEY);
    data.append("folder", folder);

    try {
      let cloudName = CLOUD_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);

          const { timestamp, signature } = await getSignatureForUpload(
            "userProfile"
          );

          const profileUrl = await uploadFile("image", timestamp, signature);
          const response = await axios.post(
            `${url}register`,
            {
              ...values,
              commonId,
              profilePicture: profileUrl,
            },
            { withCredentials: true }
          );
          dispatch(setUserData(response.data));
          actions.resetForm();
          navigate(`/${commonId}/categories`);
          setImageURL("");
          setLoading(false);
        } catch (error) {
          console.log(
            "🚀 ---------------------------------------------------------🚀"
          );
          console.log(
            "🚀  file: StoreFrontSignUp.jsx:94  onSubmit:  error",
            error
          );
          console.log(
            "🚀 ---------------------------------------------------------🚀"
          );

          setLoading(false);
          toast.error(error.response.data.message, { duration: 2000 });
        }
      },
    });

  return (
    <>
      <StoreFrontNav />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />
      <div className="min-h-screen  flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-transparent sm:bg-white mt-16 p-8 sm:rounded sm:shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-gray-400"
              />
            </div>

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
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-gray-400"
              />
            </div>

            <div className="mb-4 ">
              <label htmlFor="profilePicture" className="cursor-pointer">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="hidden"
                  onChange={(e) => setImageURL(e.target.files[0])}
                />
                {imageURL ? (
                  <img
                    src={URL.createObjectURL(imageURL)}
                    alt="Profile Picture Preview"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16  flex items-center justify-center">
                    <img
                      src={uploadIcon}
                      alt="Upload"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-gray-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-gray-400"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded"
              >
                {loading ? (
                  <div className="w-full py-2  text-white rounded-md outline-none">
                    <ThreeDots
                      height="10"
                      width="50"
                      radius="10"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="my-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to={`/${commonId && commonId}/signin`}
            className="text-blue-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default StoreFrontSignUp;
