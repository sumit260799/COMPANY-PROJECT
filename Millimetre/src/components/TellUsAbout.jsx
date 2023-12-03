import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../mnf_context/userContext";
const url = import.meta.env.VITE_USER_API_URL;

const initialValues = {
  name: "",
  gender: "male",
  fUsername: "",
  iUsername: "",
  tUsername: "",
  yUsername: "",
  category: [],
};

const TellUsAbout = () => {
  const navigate = useNavigate();
  const { tokenId } = useUserContext();

  const Gender = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "others" },
  ];

  const categories = [
    { name: "Arts & Photography" },
    { name: "Beauty" },
    { name: "Fashion" },
    { name: "Food & Drinks" },
    { name: "Health & Fitness" },
    { name: "Home & Garden" },
    { name: "Gaming & Esports" },
    { name: "Mind & Body" },
    { name: "Movies, TV & Books" },
    { name: "Music" },
    { name: "Lifestyle" },
    { name: "Outdoors & Nature" },
    { name: "Parenting & Family" },
    { name: "Pets" },
    { name: "Sports" },
    { name: "Technology" },
    { name: "Travel" },
  ];

  const [landings, setLandings] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setLandings((prevLandings) => ({
          ...prevLandings,
          category: [...prevLandings.category, value],
        }));
      } else {
        setLandings((prevLandings) => ({
          ...prevLandings,
          category: prevLandings.category.filter((cat) => cat !== value),
        }));
      }
    } else {
      setLandings((prevLandings) => ({
        ...prevLandings,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}landing`, {
        ...landings,
        commonId: tokenId,
      });

      navigate("/design");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error, {
          duration: 1000,
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          duration: 1000,
        });
      }
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="hidden md:block bg-cover bg-center p-2 mt-2 h-screen"
            style={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
            }}
          ></div>
          <div className="p-10 mt-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
              Tell Us About Yourself
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="inputField"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                autoComplete="name"
                value={landings.name}
                onChange={handleChange}
              />
              <div className="flex gap-4">
                <select
                  className="inputField"
                  name="gender"
                  autoComplete="Gender"
                  value={landings.gender}
                  onChange={handleChange}
                  autoFocus
                >
                  {Gender.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>

                <input
                  className="inputField"
                  type="text"
                  name="Country"
                  value="India"
                  disabled
                  autoComplete="India"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex items-center border px-3 py-2">
                  <BsFacebook className="text-blue-500 mr-2" />
                  <input
                    className="flex-1 bg-transparent text-black focus:outline-none"
                    type="text"
                    name="fUsername"
                    placeholder="Facebook Id"
                    autoComplete="Facebook"
                    value={landings.fUsername}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border px-3 py-2">
                  <BsInstagram className="text-pink-500 mr-2" />
                  <input
                    className="flex-1 bg-transparent text-black focus:outline-none"
                    type="text"
                    name="iUsername"
                    placeholder="Instagram Id"
                    autoComplete="Instagram"
                    value={landings.iUsername}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border px-3 py-2">
                  <BsTwitter className="text-sky-500 mr-2" />
                  <input
                    className="flex-1 bg-transparent text-black focus:outline-none"
                    type="text"
                    name="tUsername"
                    placeholder="Twitter Id"
                    autoComplete="Twitter"
                    value={landings.tUsername}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border px-3 py-2">
                  <BsYoutube className="text-red-500 mr-2" />
                  <input
                    className="flex-1 bg-transparent text-black focus:outline-none"
                    type="text"
                    name="yUsername"
                    placeholder="Youtube Id"
                    autoComplete="Youtube"
                    value={landings.yUsername}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-6">
                <p className="text-xl">What are you interested in?</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories.map((category, index) => (
                    <label
                      key={index}
                      className="inline-flex items-center bg-gray-200 p-2 rounded-md"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox text-gray-600"
                        name="category"
                        value={category.name}
                        checked={landings.category.includes(category.name)}
                        onChange={handleChange}
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btnStyle bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 "
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TellUsAbout;
