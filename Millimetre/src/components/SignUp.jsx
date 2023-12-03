import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from "../utils/ValidationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../mnf_context/userContext";
const url = import.meta.env.VITE_USER_API_URL;
console.log("🚀 -------------------------------🚀");
console.log("🚀  file: SignUp.jsx:9  url", url);
console.log("🚀 -------------------------------🚀");

const initialValues = {
  shopName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export default function SignUp() {
  const navigate = useNavigate();
  const { setTokenId } = useUserContext();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(`${url}register`, values);
          console.log("fkfkjfkfkfkfkfk", values);
          const token = response?.data?.token;
          const commonId = response?.data?.commonId;

          localStorage.setItem("token", token);
          setTokenId(commonId);
          action.resetForm();
          navigate("/tellus");
        } catch (error) {
          console.log("🚀 -----------------------------------------------🚀");
          console.log("🚀  file: SignUp.jsx:36  onSubmit:  error", error);
          console.log("🚀 -----------------------------------------------🚀");

          // toast.error(error.response.data, { duration: 2000 });
        }
      },
    });

  const isAnyFieldEmpty = Object.values(values).some((value) => !value);

  return (
    <section className=" min-h-screen flex justify-center items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-0">
        <div
          className="hidden md:block h-screen"
          style={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex justify-start mt-16">
          <div className="w-full p-5 md:p-10 ">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
              Create your store
            </h1>
            <form
              className="flex flex-col h-[50vh] justify-between items-start gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="shopName"
                value={values.shopName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 ring-1 ring-gray-400 focus:outline-none rounded-md "
                placeholder="millimetre.com/"
              />
              {touched.shopName && errors.shopName && (
                <p className="text-red-500">{errors.shopName}</p>
              )}
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 ring-1 ring-gray-400 focus:outline-none rounded-md "
                placeholder="Email Address"
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 ring-1 ring-gray-400 focus:outline-none rounded-md "
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 ring-1 ring-gray-400 focus:outline-none rounded-md "
                placeholder="Confirm Password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={values.agreedToTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border outline-none border-gray-300 rounded-md p-2 focus:border-transparent"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-500">
                    Terms and Conditions
                  </Link>
                </span>
              </label>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-black text-white rounded-md ${
                  isAnyFieldEmpty && "cursor-not-allowed opacity-50"
                }`}
                disabled={isAnyFieldEmpty}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
