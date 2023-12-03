import React, { useState } from "react";
import StoreFrontNav from "./StoreFrontNav";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { saveShippingAddress } from "../features/cartSlice";
const initialState = {
  name: "",
  phone: "",
  address1: "",
  address2: "",
  zip: "",
  city: "",
};

const Shipping = () => {
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.cart.shipping);
  const [formData, setFormData] = useState(shipping ?? initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(saveShippingAddress(formData));
      toast.success("address saved successfully", { duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StoreFrontNav />

      <div className="my-10 md:my-0  min-h-screen flex items-center justify-center">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "50px",
            },
          }}
        />
        <div className=" w-[90%] sm:w-[80%] lg:max-w-lg px-6 py-5 sm:rounded-2xl border border-slate-300">
          <h1 className="text-2xl font-semibold  text-gray-800">
            Shipping Address
          </h1>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                placeholder="123-456-7890"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-600 text-sm font-medium mb-2"
                  htmlFor="address1"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label
                  className="block text-gray-600 text-sm font-medium mb-2"
                  htmlFor="address2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                  placeholder="Apartment 4B"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-600 text-sm font-medium mb-2"
                  htmlFor="zip"
                >
                  ZIP Code
                </label>
                <input
                  type="number"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                  placeholder="12345"
                />
              </div>

              <div>
                <label
                  className="block text-gray-600 text-sm font-medium mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-500"
                  placeholder="Your City"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full  bg-slate-800 text-white border border-slate-300 font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
