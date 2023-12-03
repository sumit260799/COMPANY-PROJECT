import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uploadIcon from "./../assets/upload-icon.png";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../../mnf_context/userContext";
import { ThreeDots } from "react-loader-spinner";

// url......

const Url = import.meta.env.VITE_USER_API_URL;
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

function Design() {
  const { tokenId } = useUserContext();
  //............
  const navigate = useNavigate();

  // Define state variables
  const [imageURL, setImageURL] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [heroURL, setHeroURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [userValue, setUserValue] = useState({
    profilePicture: "", // Store the filename, not the file itself
    logo: "", // Store the filename, not the file itself
    shopTitle: "",
    shopDescription: "",
    heroImage: "",
    brandsPage: false,
    blogPage: false,
    seoTitle: "",
    seoDescription: "",
    storeBackgroundColor: "#22c55e", // Add store background color field
    productTitleColor: "#334155", // Add product title color field
    buttonColor: "#06b6d4", // Add button color field
    buttonShape: "smooth", // Add button shape field
    useCards: "Cards with shadow", // Add use cards field
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserValue((prevUserValue) => ({
      ...prevUserValue,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${baseUrl}api/upload/signature`, {
        folder,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (type, url, timestamp, signature) => {
    const folder = "InfProfile";
    const data = new FormData();
    data.append("file", url);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { timestamp, signature } = await getSignatureForUpload(
        "InfProfile"
      );
      const profileUrl = await uploadFile(
        "image",
        imageURL,
        timestamp,
        signature
      );
      const logoUrl = await uploadFile("image", logoURL, timestamp, signature);
      const heroUrl = await uploadFile("image", heroURL, timestamp, signature);

      // Send other user data to a different URL
      const response = await axios.post(`${Url}/design`, {
        ...userValue,
        profilePicture: profileUrl,
        logo: logoUrl,
        heroImage: heroUrl,
        commonId: tokenId,
      });
      setLoading(false);
      navigate("/welcome");
    } catch (error) {
      toast.error(error.response?.data?.error, { duration: 1000 });
    }
  };
  return (
    <section className=" sm:w-[70%] mx-auto my-16  sm:shadow-3">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "20px",
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="bg-transparent sm:bg-white  p-6">
          <h1 className="text-2xl font-semibold mb-4">Design your shop</h1>
          <p className="text-gray-600 mb-4">
            Your shop, your style. You can change it at any time.
          </p>
          <div className="mb-6 flex items-center gap-x-4">
            <div className="flex items-center gap-x-4">
              <h2 className="text-lg font-semibold ">Profile</h2>
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
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <img
                      src={uploadIcon}
                      alt="Upload"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="flex items-center gap-x-4">
              <h2 className="text-lg font-semibold">Logo</h2>
              <label htmlFor="logo" className="cursor-pointer">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  className="hidden"
                  onChange={(e) => setLogoURL(e.target.files[0])}
                />
                {logoURL ? (
                  <img
                    src={URL.createObjectURL(logoURL)}
                    alt="Logo Preview"
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <img src={uploadIcon} alt="Upload" className="w-12 h-12" />
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Shop title</h2>
            <input
              type="text"
              name="shopTitle"
              value={userValue.shopTitle}
              onChange={handleChange}
              placeholder="Your store's name here"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Shop description</h2>
            <textarea
              name="shopDescription"
              value={userValue.shopDescription}
              onChange={handleChange}
              placeholder="Your store's description here"
              className="w-full border border-gray-300 p-2 rounded resize-none"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Hero image</h2>
            <label htmlFor="heroImage" className="cursor-pointer">
              <input
                type="file"
                id="heroImage"
                name="heroImage"
                className="hidden"
                onChange={(e) => setHeroURL(e.target.files[0])}
              />
              {heroURL ? (
                <img
                  src={URL.createObjectURL(heroURL)}
                  alt="Profile Picture Preview"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img
                    src={uploadIcon}
                    alt="Upload"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
              )}
            </label>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Brands page</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="brandsPage"
                checked={userValue.brandsPage}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-black"
              />
              <span>Enable brands page</span>
            </label>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Blog page</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="blogPage"
                checked={userValue.blogPage}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-black"
              />
              <span>Enable blog page</span>
            </label>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">SEO Title</h2>
            <input
              type="text"
              name="seoTitle"
              value={userValue.seoTitle}
              onChange={handleChange}
              placeholder="SEO Title"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Meta Description</h2>
            <textarea
              name="seoDescription"
              value={userValue.seoDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              className="w-full border border-gray-300 p-2 rounded resize-none"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-bold">Store Background Color</h2>
            <input
              type="color"
              name="storeBackgroundColor"
              value={userValue.storeBackgroundColor}
              onChange={handleChange}
              style={{ backgroundColor: userValue.storeBackgroundColor }}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add product title color field */}
          <div className="mb-6">
            <h2 className="text-base font-bold">Product Title Color</h2>
            <input
              type="color"
              name="productTitleColor"
              value={userValue.productTitleColor}
              onChange={handleChange}
              style={{ backgroundColor: userValue.productTitleColor }}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add button color field */}
          <div className="mb-6">
            <h2 className="text-base font-bold">Button Color</h2>
            <input
              type="color"
              name="buttonColor"
              value={userValue.buttonColor}
              onChange={handleChange}
              style={{ backgroundColor: userValue.buttonColor }}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add button shape field */}
          <div className="mb-6">
            <h2 className="text-base font-bold">Button Shape</h2>
            <select
              name="buttonShape"
              value={userValue.buttonShape}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="pointy">Pointy</option>
              <option value="smooth">Smooth</option>
              <option value="smoothest">Smoothest</option>
            </select>
          </div>
          {/* Add use cards field */}
          <div className="mb-6">
            <h2 className="text-base font-bold">Use Cards</h2>
            <select
              name="useCards"
              value={userValue.useCards}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="No Cards">No Cards</option>
              <option value="Cards with border">Cards with border</option>
              <option value="Cards with shadow">Cards with shadow</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded"
          >
            {loading ? (
              <div className="flex w-full justify-center items-center">
                <ThreeDots
                  height="20"
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
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Design;
