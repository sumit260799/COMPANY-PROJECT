import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../mnf_context/userContext";
import uploadIcon from "./../assets/upload-icon.png";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const Url = import.meta.env.VITE_USER_API_URL;
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

function UpdateShopPage() {
  const { loading, tokenId, userData, fetchUserData } = useUserContext();

  useEffect(() => {
    fetchUserData();
  }, []);

  // Define state variables
  const [isloading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [heroURL, setHeroURL] = useState("");
  const [userValue, setUserValue] = useState({
    profilePicture: userData.profilePicture, // Store the filename, not the file itself
    logo: userData.logo,
    shopTitle: userData.shopTitle,
    shopDescription: userData.shopTitle,
    heroImage: userData.heroImage,
    brandsPage: userData.brandsPage,
    blogPage: userData.blogPage,
    seoTitle: userData.seoTitle,
    seoDescription: userData.seoDescription,
    storeBackgroundColor: userData.storeBackgroundColor,
    productTitleColor: userData.productTitleColor,
    buttonColor: userData.buttonColor,
    buttonShape: userData.buttonShape,
    useCards: userData.useCards,
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
      setIsLoading(true);
      const { timestamp, signature } = await getSignatureForUpload(
        "InfProfile"
      );
      const uploadPromises = [];
      if (imageURL) {
        uploadPromises.push(
          uploadFile("image", imageURL, timestamp, signature)
        );
      }

      if (logoURL) {
        uploadPromises.push(uploadFile("image", logoURL, timestamp, signature));
      }

      if (heroURL) {
        uploadPromises.push(uploadFile("image", heroURL, timestamp, signature));
      }

      if (uploadPromises.length > 0) {
        const [profileUrl, logoUrl, heroUrl] = await Promise.all(
          uploadPromises
        );

        // Send other user data to a different URL
        const response = await axios.put(`${Url}design/${tokenId}`, {
          ...userValue,
          profilePicture: profileUrl,
          logo: logoUrl,
          heroImage: heroUrl,
        });
        toast.success(response?.data?.message);
        setIsLoading(false);
      } else {
        // Handle the case where none of the URLs are available
        // You can display an error message or take appropriate action here
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error, { duration: 1000 });
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }
  return (
    <section className=" w-[90%] sm:w-[70%] mx-auto my-16 border border-gray-400 rounded-xl ">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "40px",
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="bg-transparent   p-6">
          <h1 className="text-2xl font-semibold mb-4">
            UpdateShopPage your shop
          </h1>
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
                  <div className="w-24 h-24 rounded-full flex items-center justify-center">
                    <img
                      src={
                        userValue?.profilePicture
                          ? userValue?.profilePicture
                          : "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                      }
                      alt="Upload"
                      className="w-24 h-24 object-cover rounded-full"
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
                  <div className="w-24 h-24 rounded-full flex items-center justify-center">
                    <img
                      src={
                        userValue?.logo
                          ? userValue?.logo
                          : "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                      }
                      alt="Upload"
                      className="w-24 h-24 object-cover rounded-full"
                    />
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
                <img
                  src={
                    userValue?.heroImage
                      ? userValue?.heroImage
                      : "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                  }
                  alt="Upload"
                  className="w-24 h-24 object-cover rounded-full"
                />
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
              className="border border-gray-300  rounded"
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
              className="border border-gray-300  rounded"
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
              className="border border-gray-300  rounded"
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
            {isloading ? (
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

export default UpdateShopPage;
