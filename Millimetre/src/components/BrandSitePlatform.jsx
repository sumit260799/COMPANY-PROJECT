import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";

const BrandSitePlatform = () => {
  const navigate = useNavigate();
  const { brandId } = useBrandInfoContext();

  const initialValues = {
    websiteURL: "",
    productCategory: "Shoes", // Default value
    eCommercePlatform: "Shopify", // Default value
    wheredidyoulearnabout: "LinkedIn", // Default value
    supportEmailAddress: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, action) => {
        try {
          const url = import.meta.env.VITE_BRAND_API_URL; // Move the URL inside the onSubmit function
          const response = await axios.post(`${url}/webinfo`, {
            ...values,
            commonId: brandId,
          });
          action.resetForm();
          navigate("/brand-contact");
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message, { duration: 1000 });
        }
      },
    });

  return (
    <main className="md:fixed  top-0  right-0 bottom-0 left-0 flex mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />
      <section
        className="hidden  lg:block lg:w-1/2 bg-cover h-screen bg-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/online-shopping-banner-with-laptop-concept-flat-design_1150-34866.jpg?w=740&t=st=1695488001~exp=1695488601~hmac=5d5649f0c2cf0cdfc82bc7fd4380ed8d0ecd108e1003b78e340efea137c620b8)",
        }}
      ></section>
      <section className="flex  flex-col max-md:mt-[5rem] my-5 md:my-0 md:mt-24 w-full lg:w-1/2 px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Connect your brand and start selling
          </h1>
          <p className=" text-sm md:text-lg">
            Interested in connecting to Millimetre? Create an account to learn
            more!
          </p>
          <h2 className="text-xl font-bold  mt-4">Site & platform</h2>
        </div>
        <form
          className=" md:mt-8 space-y-2 md:space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="Website" className="block font-semibold">
              Website
            </label>
            <input
              type="text"
              id="Website"
              name="websiteURL"
              value={values.websiteURL}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border outline-none rounded"
              placeholder="i.e. https://millimetre.com"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="Category" className="block font-semibold">
                Category
              </label>
              <div className="relative">
                <select
                  id="Category"
                  name="productCategory"
                  value={values.productCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border outline-none rounded appearance-none "
                >
                  <option value="Shoes">Shoes</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Sports">Sports</option>
                  <option value="Home & Interior">Home & Interior</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 13.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 11.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="Platform" className="block font-semibold">
                E-commerce platform
              </label>
              <div className="relative">
                <select
                  id="Platform"
                  name="eCommercePlatform"
                  value={values.eCommercePlatform}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border outline-none rounded appearance-none "
                >
                  <option value="Shopify">Shopify</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="FlipCart">FlipKart</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Instagram">Instagram</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 13.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 11.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="Learn" className="block font-semibold">
                Where Did You Learn About?
              </label>
              <div className="relative">
                <select
                  id="Learn"
                  name="wheredidyoulearnabout"
                  value={values.wheredidyoulearnabout}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border outline-none rounded appearance-none "
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Business Colleague">Business Colleague</option>
                  <option value="Friend">Friend</option>
                  <option value="Google or other search engine">
                    Google or other search engine
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 13.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 11.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="State/province" className="block font-semibold">
                Support Email Address
              </label>
              <input
                type="email"
                id="supportEmailAddress"
                name="supportEmailAddress"
                value={values.supportEmailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 outline-none rounded"
                placeholder="i.e. help@offscript.io"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-900"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
};

export default BrandSitePlatform;
