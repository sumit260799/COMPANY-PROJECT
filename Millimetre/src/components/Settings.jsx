import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useUserContext } from "../../mnf_context/userContext";
const url = import.meta.env.VITE_USER_API_URL;

const Settings = () => {
  const { tokenId, setProfileData, profileData } = useUserContext();

  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    phone: profileData.phone,
    address1: profileData.address1,
    address2: profileData.address2,
    city: profileData.city,
    state: profileData.state,
    zip: profileData.zip,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileId = tokenId; // Replace with the actual profileId

    try {
      const response = await axios.post(
        `${url}profile/${profileId}`, // Include the profileId in the URL
        formData
      );

      if (response.status === 201) {
        // Handle a successful submission here, e.g., show a success message
        toast.success("Data submitted successfully!");
      } else {
        toast.error("Failed to submit data. Please try again later.");
      }
    } catch (error) {
      toast.error(error.response.data.error, { duration: 1000 });
    }
  };
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(`${url}profile/${tokenId}`);
  //     setProfileData(response.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [tokenId]);

  return (
    <section className="flex justify-center items-center h-screen my-24 lg:my-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />
      <form
        className="w-full max-w-xl shadow-none border border-gray-400 bg-gray-100 mt-5 rounded-xl p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="firstName"
              type="text"
              placeholder="Jane"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastName"
              type="text"
              placeholder="Doe"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="number"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="address1"
            >
              Address Line 1
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address1"
              type="text"
              placeholder="Address Line 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />

            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="address2"
            >
              Address Line 2
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address2"
              type="text"
              placeholder="Address Line 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="city"
              type="text"
              placeholder="Albuquerque"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full  border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CT">Chhattisgarh</option>
                <option value="GA">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="GA">Goa</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UT">Uttarakhand</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="zip"
              type="text"
              placeholder="000000"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 px-4 text-[1rem] bg-black text-white float-right mt-5"
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default Settings;
