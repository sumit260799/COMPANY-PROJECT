import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
import { useUserContext } from "../../mnf_context/userContext";

import axios from "axios";
const Url = import.meta.env.VITE_BRAND_API_URL;
export default function BrandContact() {
  const navigate = useNavigate();
  const { brandId } = useBrandInfoContext();
  const { userLogin } = useUserContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  async function BrandSubmit(e) {
    e.preventDefault();
    const contactInfo = {
      fullName,
      email,
      phoneNo,
      commonId: brandId,
    };
    try {
      // Make a POST request to the server using Axios
      const response = await axios.post(`${Url}brandcontact`, contactInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        userLogin("brandUser");
        setFullName("");
        setEmail("");
        setPhoneNo("");
        navigate("/"); // Change "/success" to your desired success page
      } else {
        toast.error(response.data.message, { duration: 1000 });
      }
    } catch (error) {
      toast.error(error.response.data.message, { duration: 1000 });
    }
  }

  return (
    <section className="md:fixed top-5 right-0 bottom-0 left-0 mx-auto flex overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "50px",
          },
        }}
      />
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/online-purchase-payment-commerce-concept_53876-123952.jpg?w=996&t=st=1695490601~exp=1695491201~hmac=e23ca1ef4abefc54f00c6540f664b80a4773fec5dcd8473aed1822e893a42f87)",
        }}
      ></div>
      <div className="w-full md:w-1/2 flex flex-col my-14 md:my-16 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Connect your brand and start selling
          </h1>
          <p className="text-md lg:text-lg">
            Interested in connecting to Millimetre? Create an account to learn
            more!
          </p>
        </div>
        <form
          className="mx-auto md:w-[70%] w-[90%] md:flex md:flex-col md:mt-10 space-y-4"
          onSubmit={BrandSubmit}
        >
          <div className="mb-4">
            <label htmlFor="Name" className="block font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={fullName}
              autoComplete="name"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Full name"
              autoFocus
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              autoComplete="email"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-semibold">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={phoneNo}
              autoComplete="tel"
              className="w-full p-2 border border-gray-300 rounded  outline-none"
              placeholder="Phone Number"
              autoFocus
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-900"
          >
            Continue
          </button>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
