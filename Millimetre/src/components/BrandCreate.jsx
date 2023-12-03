import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
import uploadIcon from "./../assets/upload-icon.png";
import { ThreeDots } from "react-loader-spinner";

const url = import.meta.env.VITE_BRAND_API_URL;
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const initialValues = {
  companyName: "",
  brandName: "",
  brandDesc: "",
  brandImage: "",
  organisationNumber: "",
  vatNumber: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  city: "",
  state: "",
};

export default function BrandCreate() {
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const { brandId, setTokenId } = useBrandInfoContext();
  useEffect(() => {
    setTokenId();
  }, []);

  const uploadFile = async (type, timestamp, signature) => {
    const folder = type === "image" ? "BrandImage" : "videos";

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

  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched, // Add the touched object here
  } = useFormik({
    initialValues,

    onSubmit: async (values, action) => {
      try {
        setLoading(true);

        const { timestamp: imgTimestamp, signature: imgSignature } =
          await getSignatureForUpload("BrandImage");

        const imgUrl = await uploadFile("image", imgTimestamp, imgSignature);

        const response = await axios.post(`${url}brandinfo`, {
          ...values,
          brandImage: imgUrl,
          commonId: brandId,
        });
        console.log("rsrs", response.data);
        action.resetForm();
        setLoading(false);
        navigate("/brand-platforms");
      } catch (error) {
        toast.error(error.response.data, { duration: 3000 });
      }
    },
  });

  return (
    <main className="mx-auto max-h-screen md:overflow-hidden ">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "50px",
            color: "red", // Change the text color
            // border: "2px solid #ff9900", // Add a border
          },
        }}
      />
      <section className="grid mx-auto  my-16 md:my-4 justify-center items-center  grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex ">
          <img
            className=""
            src="https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34862.jpg?w=740&t=st=1695486145~exp=1695486745~hmac=b378cd33d15cdbe410f780a733e5ef6d58c8aeaaebbe99aaf90659a405c848e1"
          />
        </div>
        <div className="flex items-center justify-center p-2">
          <div className="max-w-full my-2 md:my-14  mx-auto">
            <h1 className="md:mt-2 text-xl lg:text-2xl xl:text-3xl  font-bold text-center mb-4">
              Connect Your Brand and Start Selling
            </h1>
            <p className="text-sm md:text-lg text-center mb-2 md:mb-6">
              Interested in connecting to Millimetre? Create an account to learn
              more!
            </p>
            <div className="text-xl mb-4">Company information</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                <input
                  type="text"
                  className="w-full outline-none p-2 border border-gray-300 rounded focus:outline-none "
                  id="companyName"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Company name"
                  autoFocus
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  name="brandName"
                  id="brandName"
                  value={values.brandName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Brand Name"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  placeholder="Organisation/EIN number"
                  id="Organisation / EIN number"
                  name="organisationNumber"
                  value={values.organisationNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  placeholder="VAT Number"
                  id="vatNumber"
                  name="vatNumber"
                  value={values.vatNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  id="Address line 1"
                  name="addressLine1"
                  value={values.addressLine1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Address line 1"
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  name="addressLine2"
                  value={values.addressLine2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Address line 2 (optional)"
                  id="addressLine2"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  placeholder="ZIP/postal code"
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  placeholder="City"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                  placeholder="State/province"
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded disabled"
                  name="India"
                  placeholder="India"
                  id="India"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
                <div className="flex items-center  border justify-around">
                  <p className="text-[1.1rem] ">Brand Image</p>
                  <label htmlFor="brandImage" className="cursor-pointer">
                    <input
                      type="file"
                      id="brandImage"
                      name="brandImage"
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
                <textarea
                  type="text"
                  className="w-full  outline-none p-3 border border-gray-300 rounded focus:outline-none "
                  id="brandDesc"
                  name="brandDesc"
                  value={values.brandDesc}
                  onChange={handleChange}
                  placeholder="Brand Description(optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none"
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
                  " Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
